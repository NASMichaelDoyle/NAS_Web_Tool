// TITLE --------------------------------------------------------------------------------------------------------
const coverTemplate = `\\documentclass[11pt]{article}
\\usepackage{graphicx} % Required for inserting images
\\usepackage{fontspec}
\\usepackage[margin=3cm]{geometry}
\\usepackage{xcolor}
\\usepackage{fancyhdr}
\\usepackage{ifthen}
\\usepackage{sectsty}
\\usepackage{hyperref}
\\usepackage{colortbl}
\\usepackage{gensymb}
\\usepackage{multirow}
\\usepackage{float}
\\usepackage{amsmath}
\\usepackage{subcaption}


% Colors
\\definecolor{headBoxColor}{HTML}{eaf5fa}
\\definecolor{headTextColor}{HTML}{8da5af}
\\definecolor{lightgray}{HTML}{cecece}
\\definecolor{midgray}{HTML}{808080}
\\definecolor{nerfred}{HTML}{c00000}
\\definecolor{darkblue}{HTML}{1a495d}
\\definecolor{tablue}{HTML}{deeaf6}
\\definecolor{red}{HTML}{ff0000}
\\definecolor{gudgreen}{HTML}{90ee90}

% Format setup
\\setmainfont{Lato}
\\newfontfamily\\titlfont{Roboto} % FIX THIS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
\\newfontfamily\\headfont{Lato}
\\sectionfont{\\fontsize{18}{22}\\headfont\\color{darkblue}}
\\subsectionfont{\\fontsize{16}{20}\\headfont\\color{darkblue}}
%\\newcolumntype{C}[1]{>{\\centering\\arraybackslash}p{#1}}

\\def\\docDate{<DATE>}
\\def\\DocID{<DOCID>}
\\def\\Title{<TITLE>}

% Header/Footer
\\pagestyle{fancy}
\\fancyhf{}{}
\\fancyfoot[R]{\\textcolor{lightgray}{\\rule{\\linewidth}{0.1mm}}\\\\\\textcolor{midgray}{\\thepage\\ |} \\textcolor{lightgray}{Page}}
\\renewcommand{\\headrulewidth}{0pt}
\\newlength{\\stringWidth}
\\settowidth{\\stringWidth}{\\textbf{\\DocID}}
\\fancyhead[L]{\\fcolorbox{headBoxColor}{headBoxColor}{\\textcolor{headTextColor}{ \\textbf{\\DocID}\\rule{\\dimexpr\\linewidth - \\stringWidth\\relax}{0pt}}}}
\\fancyhead[R]{\\fcolorbox{headBoxColor}{headBoxColor}{\\textcolor{headTextColor}{\\textbf{\\Title}}}}



\\begin{document}

\\begin{titlepage}
\\centering
\\vspace*{100pt}
\\begin{figure}[h!]
\\includegraphics[width=1\\linewidth]{static/images/NAS.png}
\\end{figure}

\\vspace{130pt}

{\\fontsize{30}{36} \\titlfont \\Title}

\\vspace{70pt}

{\\fontsize{30}{36} \\titlfont \\DocID\\ REV. <REV>}

\\vspace{10pt}

\\ifx\\docDate\\empty
  \\today
\\else
  \\docDate
\\fi

\\begin{table}[b]
    \\centering
    \\begin{tabular}{|l|l|}
        \\hline Prepare\\rule{30pt}{0pt} & <PREP>\\rule{50pt}{0pt} \\\\
        \\hline Check & <CHECK>\\\\
        \\hline Approve & <APPROVE>\\\\\\hline
    \\end{tabular}
\\end{table}
\\end{titlepage}
\\setcounter{page}{1}

\\section{Introduction}
%paratop%
`

// ELLIPSE --------------------------------------------------------------------------------------------------------
const ellTemplate = `
\\clearpage
\\section{Ellipse}

%paratop%

Ellipse analysis in Table \\ref{tab:EA1}:

\\begin{table}[h]
    \\centering
    \\begin{tabular}{|l|l|l|l|l|}
        \\hline \\rowcolor{tablue} \\textbf{$\\eta$ (Deg)} & \\textbf{$\\eta$ (Rad)} & \\textbf{$F_\\epsilon$} & \\textbf{$F_\\eta$} & \\textbf{$F_{\\epsilon\\eta}$}\\\\\\hline
		{\\%ellTLH}
    \\end{tabular}
	\\caption{Ellipse Analysis}
	\\label{tab:EA1}
\\end{table}

Graph seen in Figure \\ref{fig:EA1}:

\\begin{figure}[]
\\label{fig:EA1}
\\includegraphics[width=1\\linewidth]{temp/ellipse_chart_b64png.png}
\\caption{Ellipse Graph}
\\end{figure}
`

// TENSION CLIP --------------------------------------------------------------------------------------------------------
const tcTemplate = `
\\clearpage
\\section{Tension Clip}

%paratop%

Tension clip analysis within.

\\subsection{Data}

Data seen below.

\\begin{table}[!ht]
    \\centering
	\\label{tab:D4_1}
	\\caption{Data From BM7024.01.03.03 Figure 4.1}
    \\begin{tabular}{|l|l|l|l|l|l|l|l|l|l|}
    \\hline
        c            t & 0.020  & 0.032  & 0.040  & 0.050  & 0.063  & 0.071  & 0.080  & 0.090  & 0.1 \\\\ \\hline
        0.4 & 25.68  & 69.41  & 108.47  & 166.28  & 262.38  & 337.38  & 425.65  & 536.16  & 665.99  \\\\ \\hline
        0.5 & 21.74  & 55.31  & 86.56  & 135.00  & 210.00  & 270.93  & 342.03  & 432.04  & 533.71  \\\\ \\hline
        0.75 & 13.84  & 34.92  & 56.01  & 88.04  & 139.61  & 177.89  & 226.33  & 286.33  & 354.37  \\\\ \\hline
        1 & 9.85  & 27.03  & 41.88  & 66.88  & 106.72  & 134.06  & 172.34  & 214.92  & 266.54  \\\\ \\hline
        1.25 & 7.43  & 22.27  & 34.77  & 51.95  & 85.55  & 107.42  & 136.33  & 174.02  & 213.12  \\\\ \\hline
        1.5 & 6.57  & 17.50  & 28.44  & 43.28  & 68.28  & 87.81  & 112.03  & 140.93  & 175.35  \\\\ \\hline
        1.75 & 4.93  & 14.30  & 25.24  & 37.74  & 58.05  & 76.02  & 97.11  & 121.93  & 152.43  \\\\ \\hline
        2 & 5.63  & 12.66  & 21.25  & 30.63  & 50.16  & 65.78  & 84.53  & 106.84  & 133.43 \\\\ \\hline
    \\end{tabular}
\\end{table}

\\begin{figure}[h!]
    \\centering
    \\includegraphics[width=0.9\\linewidth]{static/images/tension_clip/UAL_CSMA.png}
    \\label{fig:UAL1}
\\end{figure}

\\begin{table}[!ht]
    \\centering
	\\label{tab:D4_2}
	\\caption{Data From BM7024.01.03.03 Figure 4.2}
    \\begin{tabular}{|l|l|l|l|l|l|l|}
    \\hline
        c            t & 0.060  & 0.090  & 0.125  & 0.160  & 0.200  & 0.250  \\\\ \\hline
        0.4 & 215 & 495 & 950 & 1580 & 2495 & 3995 \\\\ \\hline
        0.5 & 175 & 400 & 772.5 & 1275 & 1995 & 3130 \\\\ \\hline
        0.75 & 115 & 260 & 505 & 845 & 1325 & 2090 \\\\ \\hline
        1 & 95 & 200 & 380 & 625 & 995 & 1550 \\\\ \\hline
        1.25 & 67.5 & 152.5 & 305 & 500 & 790 & 1240 \\\\ \\hline
        1.5 & 53.5 & 135 & 252.5 & 412.5 & 650 & 1030 \\\\ \\hline
        1.75 & 51.5 & 112.5 & 215 & 350 & 555 & 875 \\\\ \\hline
        2 & 50 & 102.5 & 195 & 312.5 & 495 & 770 \\\\ \\hline
    \\end{tabular}
\\end{table}

\\begin{figure}[h!]
    \\centering
    \\includegraphics[width=0.9\\linewidth]{static/images/tension_clip/UAL_EA.png}
    \\label{fig:UAL2}
\\end{figure}

\\clearpage

\\subsection{Analysis}

Input parameters in Table \\ref{tab:TC1}.

\\begin{table}[h]
    \\centering
    \\begin{tabular}{|l|l|l|l|l|l|l|}
        \\hline \\textbf{Clip Type} & \\textbf{$t$} & \\textbf{$c$} & \\textbf{$F_{cy}$} & \\parbox[c]{3cm}{\\textbf{Attachment Point Spacing}} & \\textbf{Angle Width} & \\parbox[c]{3cm}{\\textbf{Attachment Point Count}}\\\\\\hline
        {\\%CTIn} & {\\%tIn} & {\\%cIn} & {\\%FcyIn} & {\\%PSIn} & {\\%AWIn} & {\\%PCIn}\\\\\\hline
    \\end{tabular}
	\\caption{Input parameters}
	\\label{tab:TC1}
\\end{table}

The above parameters result in an ultimate allowable load of \\textbf{{\\%POut}}.
`

// CRIPPLING --------------------------------------------------------------------------------------------------------
const cripTemplate = `
\\clearpage
\\section{Crippling}

%paratop%

Crippling analysis within.

$F_{CY}={\\%Fcy}$, $E_C={\\%Ec}$, data in Table \\ref{tab:crip1}:

\\begin{table}[h]
    \\centering
    \\begin{tabular}{ccccccc}
        \\textcolor{darkblue}{\\textbf{Flange}} & \\textcolor{darkblue}{\\textbf{b}} & \\textcolor{darkblue}{\\textbf{t}} & \\textcolor{darkblue}{\\textbf{Edges}} & \\textcolor{darkblue}{\\textbf{Area}} & \\textcolor{darkblue}{\\textbf{Fcc}} & \\textcolor{darkblue}{\\textbf{Fcc*A}}\\\\\\hline
        1 & {\\%b1} & {\\%t1} & {\\%Edges1} & {\\%A1} & {\\%Fcc1} & {\\%FccA1}\\\\
        2 & {\\%b2} & {\\%t2} & {\\%Edges2} & {\\%A2} & {\\%Fcc2} & {\\%FccA2}\\\\
    \\end{tabular}
	\\caption{Crippling data}
	\\label{tab:crip1}
\\end{table}

The ultimate combined allowables evaluate to: \\[F_{CC}={\\%Fcc}, P_{CC}={\\%Pcc}\\]
`

// BENDING CRIPPLING --------------------------------------------------------------------------------------------------------
const bCripTemplate = `
\\clearpage
\\section{Bending Crippling}

%paratop%

Bending crippling analysis within.

$F_{CY}={\\%Fcy}$, $E_C={\\%Ec}$, data in Table \\ref{tab:bCrip1}:

\\begin{table}[h]
    \\centering
    \\begin{tabular}{ccccccccc}
        \\textcolor{darkblue}{\\textbf{Flange}} & \\textcolor{darkblue}{\\textbf{Type}} & \\textcolor{darkblue}{\\textbf{b}} & \\textcolor{darkblue}{\\textbf{t}} & \\textcolor{darkblue}{\\textbf{Edges}} & \\textcolor{darkblue}{\\textbf{$\\overline{Y}$}} & \\textcolor{darkblue}{\\textbf{$F_{CC}$}} & \\textcolor{darkblue}{\\textbf{$Y_i$}} & \\textcolor{darkblue}{\\textbf{$M_o$}}\\\\\\hline
        1 & {\\%Type1} & {\\%b1} & {\\%t1} & {\\%Edges1} & {\\%Ybar1} & {\\%Fcc1} & {\\%Yi1} & {\\%Mo1}\\\\
        2 & {\\%Type2} & {\\%b2} & {\\%t2} & {\\%Edges2} & {\\%Ybar2} & {\\%Fcc2} & {\\%Yi2} & {\\%Mo2}\\\\
    \\end{tabular}
	\\caption{Bending crippling data}
	\\label{tab:bCrip1}
\\end{table}

The maximum allowable moment evaluates to: \\[Max Allowable Moment={\\%MAM}\\]
`

// OFB --------------------------------------------------------------------------------------------------------
const OFBTemplate = `
\\clearpage
\\section{Outstanding Flange Buckling}

%paratop%

Outstanding flange buckling analysis within. Input data in Table \\ref{tab:OFB1}, output data in Table \\ref{tab:OFB2}. {\\%ASS}

\\begin{table}[h]
    \\centering
    \\makebox[\\textwidth]{
    \\scalebox{0.9}{ % Scale down to 70%
    \\begin{tabular}{|c|cccccccccccc|}
      \\hline \\textbf{Section} & \\textbf{Material} & \\textbf{$E_C$ (msi)} & \\textbf{$F_{CY}$ (ksi)} & \\textbf{$\\mu$} & \\textbf{$nc$} & \\textbf{$t$ (in)} & \\textbf{$b$ (in)} & \\textbf{$F_0$ (psi)} & \\textbf{$F_f$ (psi)} & \\textbf{$t_{web}$ (in)} & \\textbf{$H_{fr}$ (in)} & \\textbf{Lst/Pitch Ratio}\\\\\\hline
        1 & {\\%Mater} & {\\%Ec} & {\\%Fcy} & {\\%mu} & {\\%nc} & {\\%t} & {\\%b} & {\\%F0} & {\\%Ff} & {\\%tweb} & {\\%Hfr} & {\\%LPR}\\\\\\hline
    \\end{tabular}}}
	\\caption{Input data}
	\\label{tab:OFB1}
\\end{table}


\\begin{table}[h]
    \\centering
    \\begin{tabular}{|c|cccccc|cc|}
      \\hline \\textbf{Section} & \\textbf{$F_0/F_f$} & \\textbf{$K$} & \\textbf{$E_t$ (psi)} & \\textbf{$E_s$ (psi)} & \\textbf{$\\eta$} & \\textbf{$\\mu_c$ (lb/in$\\cdot$rad)} & \\textbf{$F_{ofb}$ (psi)} & \\textbf{$MS$}\\\\\\hline
      1 & {\\%F0/Ff} & {\\%K} & {\\%Et} & {\\%Es} & {\\%eta} & {\\%mu\\_c} & {\\%Fofb} & {\\%MS}\\\\\\hline
    \\end{tabular}
	\\caption{Output data}
	\\label{tab:OFB2}
\\end{table}
`

// FPB --------------------------------------------------------------------------------------------------------
const FPBTemplate = `
\\clearpage
\\section{Flat Plate Buckling}

%paratop%

Flat plate buckling analysis within. Input data in Table \\ref{tab:FPB1}, output data in Table \\ref{tab:FPB2}.

\\begin{table}[h]
    \\centering
    \\begin{tabular}{|c|c|c|c|c|c|c|c|c|}
      \\hline \\textbf{Edge Type} & $f_S$ & $a$ & $b$ & $t$ & $E_C$ & $\\nu$ & $f_1$ & $f_2$\\\\\\hline
      {\\%ET} & {\\%fs} & {\\%a} & {\\%b} & {\\%t} & {\\%Ec} & {\\%nu} & {\\%f1} & {\\%f2}\\\\\\hline
    \\end{tabular}
	\\caption{Input data}
	\\label{tab:FPB1}
\\end{table}

\\begin{table}[h]
    \\centering
     \\makebox[\\textwidth]{
    \\scalebox{0.9}{
    \\begin{tabular}{|c|c|c|c|c|c|c|c|c|c|c|c|}
      \\hline \\multicolumn{4}{|c|}{Shear Buckling Alone} & \\multicolumn{4}{c|}{Compression/Bending Buckling Alone} & \\multicolumn{4}{c|}{Margin due to Combined Loading}\\\\\\hline
	  $a/b$ & $K_S$ & $F_{SCR}$ (ksi) & \\textbf{MS} & $f_2/f_1$ & $K_C$ & $F_{CR}$ (ksi) & \\textbf{MS} & $f_S/F_{SCR}$ & $f_1/F_{CR}$ & $f_2/f_1$ & \\textbf{MS}\\\\\\hline
      {\\%ab} & {\\%Ks} & {\\%Fscr} & \\cellcolor{<MS1>}{\\%MS\\_SBA} & {\\%f2f1} & {\\%Kc} & {\\%Fcr} & \\cellcolor{<MS2>}{\\%MS\\_CBA} & {\\%fsFscr} & {\\%f1Fcr} & {\\%f2f1} & \\cellcolor{<MS3>}{\\%MS\\_MCL}\\\\\\hline
    \\end{tabular}}}
	\\caption{Output data}
	\\label{tab:FPB2}
\\end{table}

\\begin{figure}[h]
\\label{fig:FPB1}
\\includegraphics[width=1\\linewidth]{temp/FPB_chart1_b64png.png}
\\caption{Buckling Stress Coefficients for Flat Plates Loaded in Uniform Shear}
\\end{figure}

\\begin{figure}[h]
\\label{fig:FPB2}
\\includegraphics[width=1\\linewidth]{temp/FPB_chart2_b64png.png}
\\caption{Buckling Stress Coefficients for Flat Plates Under Bending, Compression or Tension}
\\end{figure}

\\begin{figure}[h]
\\label{fig:FPB3}
\\includegraphics[width=1\\linewidth]{temp/FPB_chart3_b64png.png}
\\caption{Initial Buckling of Flat Plates Under Compression, Bending and Shear}
\\end{figure}
`

// Lug --------------------------------------------------------------------------------------------------------------
const lugTemplate = `
\\clearpage
\\section{Lug Analysis}
%paratop%

\\subsection{Properties}

Inputted properties are summarized in table \\ref{tab:lug1}. Note the $P_{LUG}$ values are calculated for a <LorC>.

\\begin{table}[h]
    \\centering
     \\makebox[\\textwidth]{
    \\scalebox{1}{
    \\begin{tabular}{|c|c|c|c|c|c|c|}
      \\hline $D_{hole}$ (in) & $D_{pin}$ (in) & $D_{I\\ bushing}$ (in) & $D_{O\\ bushing}$ (in) & $W$ (in) & $t_o$ (in) & $g$ (in)\\\\\\hline
      <inRow1>\\\\\\hline
    \\end{tabular}}}
     \\hfill \\break
     \\makebox[\\textwidth]{
    \\scalebox{1}{
    \\begin{tabular}{|c|c|c|c|c|c|c|}
      \\hline$t_{lug}$ (in) & $t_{i}$ (in) & $t_{contact}$ (in) & $a$ (in) & $c$ (in) & $\\text{\\ss}_{1}$ ($\\degree$) & $\\text{\\ss}_{2}$ ($\\degree$)\\\\\\hline
      <inRow2>\\\\\\hline
     \\end{tabular}}}
     \\hfill \\break
      \\makebox[\\textwidth]{
    \\scalebox{0.9}{
     \\begin{tabular}{|c|c|c|c|c|c|c|}
      \\hline Load ID & Ultimate Factor & Fitting Factor & $P_{axial}$ (lb) & $P_{transverse}$ (lb) & $P_{LUG\\_A}$ (lb) & $P_{LUG\\_T}$ (lb)\\\\\\hline
      <inRow3>\\\\\\hline
    \\end{tabular}}}
	\\caption{Inputted properties}
	\\label{tab:lug1}
\\end{table}

\\begin{figure}[htbp!]
    \\centering
    \\begin{subfigure}[b]{0.45\\textwidth}
       \\includegraphics[width=1\\linewidth]{images/lug/lugDia1.png}
%        \\caption{Caption for image 1}
%        \\label{fig:image1}
    \\end{subfigure}
    %\\hfill % Puts space between the subfigures
    \\begin{subfigure}[b]{0.35\\textwidth}
        \\includegraphics[width=1\\linewidth]{images/lug/lugDia2.png}
    \\end{subfigure}
    \\caption{Lug diagrams}
    \\label{fig:lug1}
\\end{figure}

\\subsubsection{Lug Loading \\& Properties}

Lug loading and properties defined in table \\ref{tab:lug2}.

\\begin{table}[h]
    \\begin{tabular}{|c|c|}
      \\hline Alloy & Material\\\\\\hline
      <inRow4>\\\\\\hline
    \\end{tabular}
      \\hfill \\break
    \\begin{tabular}{|c|c|c|c|c|c|}
      \\hline $Ftu_L$ (ksi) & $Ftu_{LT}$ (ksi) & $Ftu_{ST}$ (ksi) & $Fty_L$ (ksi) & $Fty_{LT}$ (ksi) & $Fty_{ST}$ (ksi)\\\\\\hline
      <inRow5>\\\\\\hline
    \\end{tabular}
     \\hfill \\break
    \\begin{tabular}{|c|c|c|c|c|}
      \\hline$Fbry_{1.5}$ (ksi) & $Fbry_{2.0}$ (ksi) & $Fbru_{1.5}$ (ksi) & $Fbru_{2.0}$ (ksi) & $F_{corrosion}$ (ksi)\\\\\\hline
      <inRow6>\\\\\\hline
     \\end{tabular}
     \\hfill \\break
     \\begin{tabular}{|c|c|c|c|c|c|}
      \\hline $E$ (Msi) & $\\mu$ & $e$ (\\%) & $t_{stock}$ (lb) & Axial load direction & Lug's plane\\\\\\hline
      <inRow7>\\\\\\hline
    \\end{tabular}
	\\caption{Lug loading \\& properties}
	\\label{tab:lug2}
\\end{table}

\\subsubsection{Pin \\& Bushing Properties}

\\begin{table}[ht]
    \\begin{tabular}{|c|c|c|c|}
      \\hline Spec & Material & $M_{allow}$ (in$\\cdot$lbs) & $E$ (Msi)\\\\\\hline
      <inRow8>\\\\\\hline
    \\end{tabular}
    \\caption{Pin properties}
    \\label{tab:lug3}
\\end{table}

\\begin{table}[ht]
    \\begin{tabular}{|c|c|c|c|c|c|c|}
      \\hline Spec & Material & $P_{rad}$ (lbs) & $Fbry$ (ksi) & $Fbru$ (ksi) & $E$ (Msi) & $\\mu$\\\\\\hline
      <inRow9>\\\\\\hline
    \\end{tabular}
    \\caption{Bushing properties}
    \\label{tab:lug4}
\\end{table}

\\subsection{Data and Calculations}

  The value of the axial tensile rupture factor, Ktux , for a particular lug is dependent on the lug material properties and its geometry. ESDU 91008 provides a Fortran computer program for calculating Ktux from and the material properties. This section calculates the stress concentration factor (Ke') from ESDU 81006 for a clearance pin in a hole. This differs from traditional lug analysis which assumes a generic clearance, as a result the Ktux will be different from this reference and traditional references, with the difference approaching zero as the assumed clearance matches the actual clearance.
Note:The Ultimate Lug Failure due to tensile rupture is also based on W and Diameter. If W become to large the there will be some curves for which there are no data-points. Thus conservatively W can be fictitiously reduced to compensate.

\\begin{figure}[htbp!]
    \\centering
       \\includegraphics[width=0.8\\linewidth]{images/lug/lugDia3.png}
    \\caption{Lug geometrical assumptions}
    \\label{fig:lug2}
\\end{figure}

\\begin{table}[htbp]
    \\begin{tabular}{|c|c|c|c|c|}
      \\hline $D_{hole}/W$ & $a/W$ & $t/D_{hole}$ & $K'0.2$  & $K'100$ \\\\\\hline
      <outRow1>\\\\\\hline
    \\end{tabular}
     \\hfill \\break
    \\begin{tabular}{|c|c|}
      \\hline Clearance (\\%) & $\\eta_e$\\\\\\hline
      <outRow2>\\\\\\hline
    \\end{tabular}
     \\hfill \\break
    \\begin{tabular}{|c|c|c|c|c|c|c|}
      \\hline $Ke'$ & $E_{pin}/E_{lug}$ & $Ke''/Ke'$ & $Ke''$  & $K_{tux}$ & $F_{tux}$ (ksi) & $P_{tux}$ (lb)\\\\\\hline
      <outRow3>\\\\\\hline
    \\end{tabular}
    \\caption{Axial - Lug failure due to tensile rupture}
    \\label{tab:lug5}
\\end{table}

\\begin{table}[htbp]
    \\begin{tabular}{|c|c|c|c|c|}
      \\hline $a/D_{hole}$ & $D_{hole}/t$ & $K_{qux}$ & $F_{tum}$  & $P_{qux}$ \\\\\\hline
      <outRow4>\\\\\\hline
    \\end{tabular}
    \\caption{Axial - Lug failure due to shear-bearing rupture}
    \\label{tab:lug6}
\\end{table}

\\begin{table}[htbp]
    \\begin{tabular}{|c|c|c|c|c|c|}
      \\hline $F_{tpm}$ & $F_{tum}$ & $Pux_{min}$ &  & $K_{px}$ & $P_{px}$\\\\\\hline
      <outRow5>\\\\\\hline
    \\end{tabular}
    \\caption{Axial - Lug failure due to overall permanent deformation}
    \\label{tab:lug7}
\\end{table}

\\begin{table}[htbp]
    \\begin{tabular}{|c|c|c|}
      \\hline $A_1=A_4$ (\\%) & $A_2$ & $A_3$\\\\\\hline
      <outRow6>\\\\\\hline
    \\end{tabular}
     \\hfill \\break
    \\begin{tabular}{|c|c|c|c|c|}
      \\hline $A_E$ & $A_E/(D_{hole}*t)$ & $K_{uy}$ & $F_{tum}$  & $P_{uy}$\\\\\\hline
      <outRow7>\\\\\\hline
    \\end{tabular}
    \\caption{Transverse - Lug failure due to rupture}
    \\label{tab:lug8}
\\end{table}

\\begin{figure}[htbp!]
    \\centering
       \\includegraphics[width=0.6\\linewidth]{images/lug/lugDia9.png}
    \\caption{Lug area A1-A4}
    \\label{fig:lug3}
\\end{figure}

\\begin{table}[htbp]
    \\begin{tabular}{|c|c|c|c|}
      \\hline  & $K_{py}$ & $F_{tpm}$ & $P_{py}$\\\\\\hline
      <outRow8>\\\\\\hline
    \\end{tabular}
    \\caption{Transverse - Lug failure due to overall permanent deformation}
    \\label{tab:lug9}
\\end{table}

\\begin{table}[htbp]
    \\begin{tabular}{|c|c|c|c|c|}
      \\hline $a/D_{hole}$ & $Fbru_{1.5}$ & $Fbru_{2.0}$ & $F_{bru}$  & $P_{bru}$\\\\\\hline
      <outRow9>\\\\\\hline
    \\end{tabular}
    \\caption{Failure due to bearing rupture}
    \\label{tab:lug10}
\\end{table}

\\begin{table}[htbp]
    \\begin{tabular}{|c|c|c|c|c|}
      \\hline $a/D_{hole}$ & $Fbry_{1.5}$ & $Fbry_{2.0}$ & $F_{bry}$  & $P_{bry}$\\\\\\hline
      <outRow10>\\\\\\hline
    \\end{tabular}
    \\caption{Failure due to bearing permanent deformation}
    \\label{tab:lug11}
\\end{table}

\\begin{table}[htbp]
    \\centering
    \\begin{tabular}{|c|c|c|c|c|c|}
      \\hline\\multicolumn{3}{|c|}{Ultimate Load} & \\multicolumn{3}{c|}{Limit Load}\\\\\\hline
      $R_x$ & $R_y$ & MS & $R_x$ & $R_y$ & MS\\\\\\hline
      <outRow11>\\\\\\hline
    \\end{tabular}
    \\caption{Margin of safety - Lug's section}
    \\label{tab:lug12}
\\end{table}

\\begin{table}[htbp]
    \\centering
    \\begin{tabular}{|c|c|c|c|c|c|}
      \\hline\\multicolumn{3}{|c|}{Ultimate Load} & \\multicolumn{3}{c|}{Limit Load}\\\\\\hline
      $P_{applied}$ & $P_{bru}$ & MS & $P_{LIM\\ applied}$ & $P_{bry}$ & MS\\\\\\hline
      <outRow12>\\\\\\hline
    \\end{tabular}
    \\caption{Margin of safety - Lug's bearing strength}
    \\label{tab:lug13}
\\end{table}

\\begin{table}[htbp]
    \\centering
    \\begin{tabular}{|c|c|c|c|c|c|}
      \\hline\\multicolumn{3}{|c|}{Ultimate Load} & \\multicolumn{3}{c|}{Limit Load}\\\\\\hline
      $P_{applied}$ & $P_{bru}$ & MS & $P_{LIM\\ applied}$ & $P_{bry}$ & MS\\\\\\hline
      <outRow13>\\\\\\hline
    \\end{tabular}
    \\caption{Margin of safety - Bushing's bearing strength}
    \\label{tab:lug14}
\\end{table}

\\begin{table}[htbp]
    \\begin{tabular}{|c|c|c|c|c|c|}
      \\hline Interference & $e_{fit}$ &  & $K$ & $A$ & $B$\\\\\\hline
      <outRow14>\\\\\\hline
    \\end{tabular}
     \\break\\break Lug interface pressure, and residual stress\\hfill\\break
    \\begin{tabular}{|c|c|c|c|}
      \\hline $p$ & $f_{max}$ & $F_{corrosion}$ & MS\\\\\\hline
      <outRow15>\\\\\\hline
    \\end{tabular}
    \\caption{Interface fit bushing}
    \\label{tab:lug15}
\\end{table}

\\begin{table}[htbp]
    \\begin{tabular}{|c|c|c|c|c|c|c|c|}
      \\hline $P_{pin}$ &  &  & $\\gamma$ & $b$ & $M$ & $M_{allow}$ & MS \\\\\\hline
      <outRow16>\\\\\\hline
    \\end{tabular}
    \\caption{Pin failure}
    \\label{tab:lug15}
\\end{table}
`

// Boltgroup
const boltgroupTemplate = `
\\clearpage
\\section{Boltgroup 2D}
%paratop%

\\subsection{Properties}

\\begin{table}[htbp]
    \\centering
     \\makebox[\\textwidth]{
    \\scalebox{1}{
    \\begin{tabular}{|c|c|c|c|c|c|}
      \\hline $Y$ (in) & $Z$ (in) & $F_Y$ (lb) & $F_Z$ (lb) & $M_X$ (in$\\cdot$lb) & Load Case\\\\\\hline
      <locy> & <locz> & <Fy> & <Fz> & <Mx> & <loadCase>\\\\\\hline
    \\end{tabular}}}
	\\caption{Applied Load}
	\\label{tab:bg1}
\\end{table}

\\begin{table}[htbp]
    \\centering
     \\makebox[\\textwidth]{
    \\scalebox{1}{
    \\begin{tabular}{|c|c|c|c|c|}
      \\hline Fastener & $Y$ (in) & $Z$ (in) & $Y_{efficiency}$ & $Z_{efficiency}$\\\\\\hline
      <inRow>
    \\end{tabular}}}
	\\caption{Fastener locations and efficiencies}
	\\label{tab:bg2}
\\end{table}

From the above properties, the following can be calculated in table \\ref{tab:bg3}:

\\begin{table}[htbp]
    \\centering
     \\makebox[\\textwidth]{
    \\scalebox{1}{
    \\begin{tabular}{|c|c|c|c|}
      \\hline $Y_{cg}$ (in) & $Z_{cg}$ (in) & $M_{X\\ cg}$ (in$\\cdot$lb) & $I_X$ (in$^4$)\\\\\\hline
      <Ycg> & <Zcg> & <Mxcg> & <Ix>\\\\\\hline
    \\end{tabular}}}
	\\caption{Center of Gravity}
	\\label{tab:bg3}
\\end{table}

\\begin{figure}[htbp!]
    \\centering
       \\includegraphics[width=1\\linewidth]{temp/boltgroup_chart_b64png.png}
    \\caption{Boltgroup diagram}
    \\label{fig:bg1}
\\end{figure}

\\subsection{Output}

\\begin{table}[htbp!]
    \\centering
     \\makebox[\\textwidth]{
    \\scalebox{0.9}{
    \\begin{tabular}{|c|c|c|c|c|c|c|c|c|c|}
      \\hline Fastener & $Y-Y_{cg}$ (in) & $Z-Z_{cg}$ (in) & $P_Y\\_F_Y$ (lb) & $P_Z\\_F_Z$ (lb) & $P_Y\\_M_X$ (lb) & $P_Z\\_M_X$ (lb) & $P_Y$ (lb) & $P_Z$ (lb) & $P$ (lb) \\\\\\hline
      <outRow>
    \\end{tabular}}}
	\\caption{Output}
	\\label{tab:bg4}
\\end{table}

\\begin{table}[htbp]
    \\centering
     \\makebox[\\textwidth]{
    \\scalebox{1}{
    \\begin{tabular}{|c|c|c|}
      \\hline $P_{Y\\ total}$ (lb) & $P_{Z\\ total}$ (lb) & $M_{X\\ total}$ (in$\\cdot$lb)\\\\\\hline
      <PyTot> & <PzTot> & <MxTot>\\\\\\hline
    \\end{tabular}}}
	\\caption{Balance}
	\\label{tab:bg5}
\\end{table}
`

// Lap Joint Doubler ------------------------------------------------------------------------------------------------
const LJDTemplate = `
\\clearpage
\\section{Lap Joint Doubler}
%LJD colors
\\definecolor{LJD0}{HTML}{ffff99}
\\definecolor{LJD1}{HTML}{99ccff}
\\definecolor{LJD2}{HTML}{ff99cc}
\\definecolor{LJD3}{HTML}{cc99ff}
\\definecolor{LJD4}{HTML}{ffcc99}
\\definecolor{LJD5}{HTML}{33cccc}
\\definecolor{LJD6}{HTML}{99cc00}
\\definecolor{LJD7}{HTML}{ffcc00}
\\definecolor{LJD8}{HTML}{ff9900}
\\definecolor{LJD9}{HTML}{ff6600}
\\definecolor{LJD10}{HTML}{666699}
\\definecolor{LJD11}{HTML}{969696}
\\definecolor{LJD12}{HTML}{003366}
\\definecolor{LJD13}{HTML}{339966}
\\definecolor{LJD14}{HTML}{003300}
\\definecolor{LJD15}{HTML}{333300}
\\definecolor{LJD16}{HTML}{993300}
\\definecolor{LJD17}{HTML}{993366}
\\definecolor{LJD18}{HTML}{333399}
\\definecolor{LJD19}{HTML}{333333}

%paratop%

The following section analyses the loads through a given doubler configuration of <plates> plates, under an applied load of <TAppLoad> lbs. The configuration is modeled as a 2-dimensional finite element model.

\\subsection{Properties}

Table \\ref{tab:LJD1} states the relative positions of each fastener and each edge of the doubler configuration, along the X-axis:

\\begin{table}[h]
    \\centering
     \\makebox[\\textwidth]{
    \\scalebox{<tScale>}{
    \\begin{tabular}{<cols0>}
      \\hline <pos> \\\\\\hline
    \\end{tabular}}}
	\\caption{Relative positions}
	\\label{tab:LJD1}
\\end{table}

Table \\ref{tab:LJD2} states the thickness, width and Young's modulus respectively for each section of each plate, subdivided at each fastener:

\\begin{table}[h]
    \\centering
     \\makebox[\\textwidth]{
    \\scalebox{<tScale>}{
    \\begin{tabular}{<cols1>}
      \\hline <pProps> \\\\\\hline
    \\end{tabular}}}
	\\caption{Plate properties}
	\\label{tab:LJD2}
\\end{table}

The diameter and Young's modulus for each fastener is listed in table \\ref{tab:LJD3}. Whether the fastener is a bolt or a rivet is also listed.

\\begin{table}[h]
    \\centering
     \\makebox[\\textwidth]{
    \\scalebox{<tScale>}{
    \\begin{tabular}{<cols2>}
      \\hline <fProps> \\\\\\hline
    \\end{tabular}}}
	\\caption{Fastener properties}
	\\label{tab:LJD3}
\\end{table}

\\subsection{Output}

A visual representation of the FEM model can be seen in table \\ref{tab:LJD4}.

\\begin{table}[htbp]
    \\centering
     \\makebox[\\textwidth]{
    \\scalebox{<tScale>}{
    \\begin{tabular}{<cols3>}
      \\hline <FEM> \\\\\\hline
    \\end{tabular}}}
	\\caption{FEM representation}
	\\label{tab:LJD4}
\\end{table}

From the above properties, the loading through every plate and fastener can be computed, seen in table \\ref{tab:LJD5}. Note that fastener bearing loads are colored orange.

\\begin{table}[htbp]
    \\centering
     \\makebox[\\textwidth]{
    \\scalebox{<tScale>}{
    \\begin{tabular}{<cols4>}
      \\hline <loads> \\\\\\hline
    \\end{tabular}}}
	\\caption{Loads}
	\\label{tab:LJD5}
\\end{table}
`

// Inter Rivet Buckling ------------------------------------------------------------------------------------------------
const IRBTemplate = `
\\clearpage
\\section{Inter Rivet Buckling}
%paratop%

The following section analyses inter rivet buckling. Data and properties for the section<sornot>seen in table \\ref{tab:IRB1}.

\\begin{table}[htbp]
    \\centering
     \\makebox[\\textwidth]{
    \\scalebox{1}{
    \\begin{tabular}{|c|c|c|c|c|c|c|c|c|c|}
      \\hline \\textbf{Sections} & \\textbf{Material} & \\textbf{E\\textsubscript{c}} & \\textbf{F\\textsubscript{cy}} & \\textbf{nc} & \\textbf{Pitch} & \\textbf{c} & \\textbf{t\\textsubscript{sheet}} & \\textbf{E\\textsubscript{t}} & \\textbf{F\\textsubscript{ir}} \\\\\\hline
      <trow> \\\\\\hline
    \\end{tabular}}}
	\\caption{Inter rivet buckling data}
	\\label{tab:IRB1}
\\end{table}
`

// FRAME STA --------------------------------------------------------------------------------------------------------
const frameSTATemplate = `
\\clearpage
\\section{Frame STA loads}
%paratop%

\\subsection{Properties}
\\label{sect:fSTA1}

Frame properties are summarized in tables \\ref{tab:fSTA1} and \\ref{tab:fSTA2}.

\\begin{table}[h]
    \\centering
     \\makebox[\\textwidth]{
    \\scalebox{1}{
    \\begin{tabular}{|c|c|c|c|c|c|}
      \\hline $F_{CY}$ (psi)& $t_{frame, web}$ (in)& $H_{frame}$ (in)& $Y_{frame}$ (in)& $E_{frame}$ (Msi)& $A_{frame}$ (in$^2$)\\\\\\hline
      <Fcy> & <tf> & <Hf> & <Yf> & <Ef> & <Af>\\\\\\hline
     \\end{tabular}}}
     \\hfill \\break
     \\makebox[\\textwidth]{
    \\scalebox{1}{
    \\begin{tabular}{|c|c|c|c|c|c|c|c|}
      \\hline $I_{frame}$ (in$^4$)& $r$ (in)& $L$ (in)& $E_{skin}$ (Msi)& $t_{skin}$ (in)& $A_{str}$ (in$^2$)& $I_{str}$ (in$^4$)& $b_{str}$ (in)\\\\\\hline
      <If> & <r> & <L> & <Esk> & <tsk> & <Astr> & <Istr> & <bstr>\\\\\\hline
     \\end{tabular}}}
	\\caption{Inputted properties}
	\\label{tab:fSTA1}
\\end{table}

\\begin{table}[h]
    \\centering
     \\makebox[\\textwidth]{
    \\scalebox{1}{
    \\begin{tabular}{|c|c|c|c|c|c|c|c|c|c|}
      \\hline $\\theta_{str}$ ($\\degree$) & $t_e$ (in)& $t\\prime$ (in)& $i$ (in$^3$) & $A$ & $B$ & $L_c$ (in)& $L_r$ (in)& $\\gamma$ & $L_r/L_c$\\\\\\hline
      <thetastr> & <te> & <tprime> & <iOut> & <A> & <B> & <Lc> & <Lr> & <gamma> & <LrLc>\\\\\\hline
    \\end{tabular}}}
	\\caption{Calculated properties}
	\\label{tab:fSTA2}
\\end{table}

\\subsection{Loading and Stresses}

For each frame there exists 9 potential locations of load application. Table \\ref{tab:fSTA3} contains the manual input of Radial Load (P), Tangential Load (S) and Moment (M) at any given location ($\\Phi$). The proceeding table derived the frame loading clockwise from top dead center (theta=0).

\\begin{table}[h]
    \\centering
     \\makebox[\\textwidth]{
    \\scalebox{1}{
    \\begin{tabular}{|r|c|c|c|c|c|c|c|c|c|}
      \\hline $Location =$ & $1$ & $2$ & $3$ & $4$ & $5$ & $6$ & $7$ & $8$ & $9$\\\\\\hline
      <LLTRow>
    \\end{tabular}}}
	\\caption{Applied loading}
	\\label{tab:fSTA3}
\\end{table}

Using the properties from section \\ref{sect:fSTA1}, the frame stresses can be calculated, shown in table \\ref{tab:fSTA4}

\\begin{table}[h!]
    \\centering
     \\makebox[\\textwidth]{
    \\scalebox{1}{
    \\begin{tabular}{|c|c|c|c|c|c|c|c|c|c|}
      \\hline \\textbf{Theta} & \\textbf{Axial} & \\textbf{Shear} & \\textbf{Bending} & \\textbf{f/a} & \\textbf{MY/I} & \\textbf{M(H-Y)/I} & \\textbf{f2} & \\textbf{f1} & \\textbf{fs}\\\\\\hline
      <STRow>
    \\end{tabular}}}
	\\caption{Frame stresses}
	\\label{tab:fSTA4}
\\end{table}

\\subsection{Buckling}

As with the intercostals the Frame web combined compression and bending buckling allowable is corrected for plasticity where necessary and the buckling ratio used to determine the buckling margin with the shear buckling ratio, calculated in section \\ref{sect:fSTA2}.

\\subsubsection{Compression Buckling}

Compression buckling analysis seen in table \\ref{tab:fSTA5}, figure \\ref{fig:fSTA1}.

\\begin{table}[h!]
    \\centering
     \\makebox[\\textwidth]{
    \\scalebox{1}{
    \\begin{tabular}{|c|c|c|}
      \\hline $f_1$ (psi) & $f_2$ (psi)& $f_1/f_2$\\\\\\hline
      <CBRow1>\\\\\\hline
    \\end{tabular}}}
    \\hfill \\break
    \\makebox[\\textwidth]{
    \\scalebox{1}{
    \\begin{tabular}{|c|c|c|c|c|c|c|c|c|c|}
      \\hline $a$ (in) & $b$ (in)& $k_b$ & $K_b$ & $E_t$ (psi) & $E_s$ (psi) & $\\nu$ & $\\eta$ & $F_{bcr, el} (psi)$ & $F_{bcr, pl} (psi)$\\\\\\hline
      <CBRow2>\\\\\\hline
    \\end{tabular}}}
	\\caption{Compression buckling}
	\\label{tab:fSTA5}
\\end{table}

\\begin{figure}[h!]
	\\centering
    \\label{fig:fSTA1}
    \\includegraphics[width=0.5\\linewidth]{static/images/frame/FrameDia1.png}
    \\caption{ESDU S020404}
\\end{figure}

\\subsubsection{Shear Buckling}
\\label{sect:fSTA2}

Shear buckling analysis seen in table \\ref{tab:fSTA6}, figure \\ref{fig:fSTA2}.

\\begin{table}[h!]
    \\centering
     \\makebox[\\textwidth]{
    \\scalebox{1}{
    \\begin{tabular}{|c|c|c|c|c|c|}
      \\hline $a$ (in)& $b$ (in)& $k_s$ & $J$ (psi)& $K_s$ & $F_{scr}$ (psi)\\\\\\hline
      <SBRow1>\\\\\\hline
     \\end{tabular}}}
     \\hfill \\break
     \\makebox[\\textwidth]{
    \\scalebox{1}{
    \\begin{tabular}{|c|c|c|c|c|c|c|}
      \\hline $f_{s}$ (psi)& $F_{scr}$ (psi)& $f_b$ (psi) & $F_{bcr,pl}$ (psi)& $R_s$ & $R_b$ & \\textbf{MS}\\\\\\hline
      <SBRow2>\\\\\\hline
     \\end{tabular}}}
	\\caption{Shear buckling}
	\\label{tab:fSTA6}
\\end{table}

\\begin{figure}[h!]
	\\centering
    \\label{fig:fSTA2}
    \\includegraphics[width=0.5\\linewidth]{static/images/frame/FrameDia2.png}
    \\caption{ESDU 71005}
\\end{figure}
`

// FRAME WDT --------------------------------------------------------------------------------------------------------
const frameWDTTemplate = `
\\section{Web Diagonal Tension}
%paratop%

\\subsection{Properties}
\\label{sect:fWDT1}

Inputted properties are summarized in table \\ref{tab:fWDT1}.

\\begin{table}[h]
    \\centering
     \\makebox[\\textwidth]{
    \\scalebox{1}{
    \\begin{tabular}{|c|c|c|c|c|c|c|}
      \\hline $E$ (psi) & $E_{C}$ (psi) & $F_{tu}$ (psi) & $F_{cy}$ (psi) & $F_{su}$ (psi) & $b$ (in) & $h$ (in)\\\\\\hline
      <E> & <Ec> & <Ftu> & <Fcy> & <Fsu> & <b> & <h>\\\\\\hline
    \\end{tabular}}}
     \\hfill \\break
     \\makebox[\\textwidth]{
    \\scalebox{1}{
    \\begin{tabular}{|c|c|c|c|}
      \\hline \\multirow{2}{*}{$t$ (in)} & Stiffener & Web & Chord\\\\\\cline{2-4}
      & <tstiff> & <tweb> & <tch>\\\\\\hline
     \\end{tabular}}}
     \\hfill \\break
     \\begin{tabular}{|c|c|c|c|c|c|c|}
      \\hline $v$ & $P_{shear}$ (lbs) & $I_{Chord}$ (in$^4$) & $A_{Chord}$ (in$^2$) & $e_{Stiff}$ (in) & $A_{Stiff}$ (in$^2$) & $I_{Stiff}$ (in$^4$)\\\\\\hline
      <v> & <Pshear> & <Ich> & <Ach> & <estiff> & <Astiff> & <Istiff>\\\\\\hline
    \\end{tabular}
	\\caption{Inputted properties}
	\\label{tab:fWDT1}
\\end{table}

\\subsection{Section Properties - Inner Chord}

The section properties of the inner chord are herein summarized:

\\begin{figure}[!htb]
	\\centering
    \\label{fig:fWDT1}
    \\includegraphics[width=0.8\\linewidth]{static/images/frame/WDTDia1.png}
    \\caption{Inner chord diagram}
\\end{figure}

\\begin{table}[!htb]
    \\centering
     \\makebox[\\textwidth]{
    \\scalebox{1}{
    \\begin{tabular}{|c|c|c|c|c|c|c|c|}
      \\hline $Item$ & $b$ (in) & $t$ (in) & $A$ (in$^2$) & $z$ (in) & $Az$ (in$^3$) & $Az^2$ (in$^4$) & $I_{yo}$ (in$^4$)\\\\\\hline
      <SPICRow>\\\\\\hline
    \\end{tabular}}}
	%\\caption{Applied loading}
	\\label{tab:fWDT2}
\\end{table}

\\begin{table}[!htb]
    \\centering
     \\makebox[\\textwidth]{
    \\scalebox{1}{
    \\begin{tabular}{rcl}
      $\\overline{z}=$ & <SPICzbar> & in\\\\
      $I_{yy}=$ & <SPICIyy> & in$^4$\\\\
      $A=$ & <SPICA> & in$^2$\\\\
    \\end{tabular}}}
	%\\caption{Applied loading}
	\\label{tab:fWDT3}
\\end{table}

\\subsection{Section Properties - Stringer Clip}

The section properties of the stiffener (stringer clip) are herein summarized:

\\begin{figure}[!htb]
    \\label{fig:fWDT2}
	\\centering
    \\includegraphics[width=0.5\\linewidth]{static/images/frame/WDTDia2.png}
    \\caption{Stiffener (stringer clip) diagram}
\\end{figure}

\\begin{table}[!htb]
    \\centering
     \\makebox[\\textwidth]{
    \\scalebox{1}{
    \\begin{tabular}{|c|c|c|c|c|c|c|c|}
      \\hline $Item$ & $b$ (in) & $t$ (in) & $A$ (in$^2$) & $z$ (in) & $Az$ (in$^3$) & $Az^2$ (in$^4$) & $I_{yo}$ (in$^4$)\\\\\\hline
      <SPSCRow>\\\\\\hline
    \\end{tabular}}}
	%\\caption{Applied loading}
	\\label{tab:fWDT4}
\\end{table}

\\begin{table}[!htb]
    \\centering
     \\makebox[\\textwidth]{
    \\scalebox{1}{
    \\begin{tabular}{rcl}
      $\\overline{z}=$ & <SPSCzbar> & in\\\\
      $I_{yy}=$ & <SPSCIyy> & in$^4$\\\\
      $A=$ & <SPSCA> & in$^2$\\\\
    \\end{tabular}}}
	%\\caption{Applied loading}
	\\label{tab:fWDT5}
\\end{table}

\\subsection{Ultimate Allowable}

The buckling allowable is calculated by one of the following equations:

\\[\\frac{F_{scr}}{\\eta} = k_{ss}\\frac{\\pi^2E}{12(1-\\mu^2)}(\\frac{t}{b})^2[R_h+\\frac{1}{2}(R_d-R_h)(\\frac{b}{d_c})^3], b<d_c\\]

or

\\[\\frac{F_{scr}}{\\eta} = k_{ss}\\frac{\\pi^2E}{12(1-\\mu^2)}(\\frac{t}{d_c})^2[R_d+\\frac{1}{2}(R_h-R_d)(\\frac{d_c}{b})^3], b>d_c\\]

\\begin{figure}[H]
    \\label{fig:fWDT3}
	\\centering
    \\includegraphics[width=0.5\\linewidth]{static/images/frame/WDTDia3.png}
\\end{figure}

With Kss calculated from Figure \\ref{fig:fWDT4}.

\\begin{figure}[H]
    \\label{fig:fWDT4}
	\\centering
    \\includegraphics[width=0.8\\linewidth]{static/images/frame/WDTDia4.png}
    \\caption{Figure 18 of NASA TM X-73305, Section B4.8.2}
\\end{figure}

\\begin{table}[H]
    \\centering
    \\begin{tabular}{|c|c|c|c|c|}
      \\hline $min(dc, b)$ & $max(dc,b)$ & $Bottom$ & $K_{ss}$ & $Equation$\\\\\\hline
      <mindcb> & <maxdcb> & <bottom> & <Kss> & <equation>\\\\\\hline
    \\end{tabular}
	%\\caption{Applied loading}
	\\label{tab:fWDT6}
\\end{table}

Rh and Rd can be calculated from Figure \\ref{fig:fWDT5}.

\\begin{figure}[H]
    \\label{fig:fWDT5}
	\\centering
    \\includegraphics[width=0.8\\linewidth]{static/images/frame/WDTDia5.png}
    \\caption{Figure 19 of NASA TM X-73305, Section B4.8.2}
\\end{figure}

\\begin{table}[H]
    \\centering
    \\begin{tabular}{|c|c|c|c|}
      \\hline $tu/t$ & $tf/t$ & $R_h$ & $R_d$\\\\\\hline
      <tut> & <tft> & <Rh> & <Rd>\\\\\\hline
    \\end{tabular}
    \\begin{tabular}{|c|c|c|c|c|c|c|c|c|}
      \\hline $K_{ss}$ & $E$ & $v$ & $b$ & $dc$ & $t$ & $R_h$ & $R_d$ & $F_{scr}/n$\\\\\\hline
      <Kss> & <E> & <v> & <b> & <dc> & <t> & <Rh> & <Rd> & <Fscrn>\\\\\\hline
    \\end{tabular}
	%\\caption{Applied loading}
	\\label{tab:fWDT7}
\\end{table}

Correcting for plasticity,

\\begin{figure}[H]
    \\label{fig:fWDT6}
	\\centering
    \\includegraphics[width=0.8\\linewidth]{static/images/frame/WDTDia6.png}
    \\caption{Figure 20 of NASA TM X-73305, Section B4.8.2}
\\end{figure}

\\begin{figure}[H]
    \\label{fig:fWDT7}
	\\centering
    \\includegraphics[width=0.8\\linewidth]{static/images/frame/WDTDia7.png}
    \\caption{Figure 21 of NASA TM X-73305, Section B4.8.2}
\\end{figure}

\\begin{table}[H]
    \\centering
    \\begin{tabular}{|c|c|c|c|}
      \\hline $F_{scr}$ (ksi) & $f_s/F_{scr}$ & $f_s$ & $k$\\\\\\hline
      <Fscr> & <fsFscr> & <fs> & <k>\\\\\\hline
    \\end{tabular}
	%\\caption{Applied loading}
	\\label{tab:fWDT7}
\\end{table}

\\begin{figure}[H]
    \\label{fig:fWDT8}
	\\centering
    \\includegraphics[width=0.8\\linewidth]{static/images/frame/WDTDia8.png}
    \\caption{Figure 22 of NASA TM X-73305, Section B4.8.2}
\\end{figure}

\\begin{table}[H]
    \\centering
    \\begin{tabular}{|c|c|c|c|c|}
      \\hline $Aue/bt$ & $2Af/Ht$ & $\\alpha$ & $tan(\\alpha)$ & $wb$\\\\\\hline
      <Auebt> & <\\_2AfHt> & <alpha> & <tanalpha> & <wb>\\\\\\hline
    \\end{tabular}
	%\\caption{Applied loading}
	\\label{tab:fWDT7}
\\end{table}

\\begin{figure}[H]
    \\label{fig:fWDT9}
	\\centering
    \\includegraphics[width=0.8\\linewidth]{static/images/frame/WDTDia9.png}
    \\caption{Figure 24 of NASA TM X-73305, Section B4.8.2}
\\end{figure}

\\begin{table}[H]
    \\centering
    \\begin{tabular}{|c|c|}
      \\hline $F_{s,\\ all}$ (ksi) & $F_s\\ All$ (psi)\\\\\\hline
      <Fsall> & <Fs\\_All>\\\\\\hline
    \\end{tabular}
	%\\caption{Applied loading}
	\\label{tab:fWDT7}
\\end{table}
`

// FRAME CC --------------------------------------------------------------------------------------------------------
const frameCapCompTemplate = `

`

// FRAME CT --------------------------------------------------------------------------------------------------------
const frameCapTensTemplate = `

`

