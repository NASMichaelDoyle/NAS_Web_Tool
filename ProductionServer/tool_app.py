from flask import Flask, request, send_file, send_from_directory
from flask_cors import CORS
import subprocess
import os
import base64
import shutil #if os.path.exists("test"): shutil.rmtree("test")

app = Flask(__name__, static_folder='static')
CORS(app)

# Route to serve the main index.html file
@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/get_multi_latex', methods=['GET', 'POST'])
def get_multi_latex():
    if request.method == 'GET':
        try:
            # Send the template tex file
            with open("multiTexTemplate.tex", "r", encoding='utf-8') as f:
                tex_content = f.read()
            return tex_content, 200, {'Content-Type': 'text/plain; charset=utf-8'}
        except FileNotFoundError:
            return "Error: file not found.", 500
        except Exception as e:
            return f"An unexpected error occurred: {e}", 500
    elif request.method == 'POST':
        try:
            latex_code = request.form.get('latex_code')
            filename_base = "temp_latex"
            tex_filename = f"{filename_base}.tex"
            pdf_filename = f"{filename_base}.pdf"
            if not os.path.exists("temp"): os.makedirs("temp")

            for key, value in request.form.items():
                if key.lower().endswith("_b64png"):
                    try:
                        header, img_encoded = value.split(",", 1)
                        image_bytes = base64.b64decode(img_encoded)

                        with open(f"temp/{key}.png", 'wb') as f:
                            f.write(image_bytes)

                    except Exception as e:
                        print(f"Error saving image: {e}")
                        return f"Error saving image: {e}", 500

            # Save the LaTeX code to a temporary file
            with open(tex_filename, 'w', encoding='utf-8') as f:
                f.write(latex_code)


            # Compile the LaTeX file using xelatex
            command = ['xelatex', '-interaction=nonstopmode', tex_filename]
            process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            stdout, stderr = process.communicate()  # Wait for the process to finish
            process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            stdout, stderr = process.communicate(timeout=30) # Add a timeout

            if process.returncode != 0:
                error_message = stderr.decode('utf-8')
                print(f"LaTeX compilation error:\n{error_message}")
                return f"LaTeX compilation failed:\n{error_message}", 500

            # Send the generated PDF file back to the user for download
            return send_file(f"../{pdf_filename}", as_attachment=True, download_name="compiled.pdf")
        except subprocess.TimeoutExpired:
            return "LaTeX compilation timed out.", 500
        except FileNotFoundError as e: # Catch FileNotFoundError specifically here!
            print(f"POST Request Error: File not found during processing. Details: {e}")
            return "Error: File not found or doesn't exist", 500
        except Exception as e:
            return f"An unexpected error occurred: {e}", 500
        finally:
            # Clean up temporary files
            os.remove(tex_filename)
            if os.path.exists(pdf_filename): os.remove(pdf_filename)
            if os.path.exists(f"{filename_base}.log"): os.remove(f"{filename_base}.log")
            if os.path.exists(f"{filename_base}.aux"): os.remove(f"{filename_base}.aux")
            if os.path.exists(f"{filename_base}.out"): os.remove(f"{filename_base}.out")
            if os.path.exists("temp"): shutil.rmtree("temp")

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0') # Make it accessible on your network for testing