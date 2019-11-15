const shell = require('shelljs')

// concurrently "lpr -P HP_Color_LaserJet_CP5225dn_2 -o media=A4,Lower -o sides=two-sided-short-edge 2019-11-15_16-26-30_07.pdf"
// 
// 
if (shell.exec('lpr -P HP_Color_LaserJet_CP5225dn_2 -o media=A4,Lower -o sides=two-sided-short-edge assets/pdf/2019-11-15_16-26-30_07.pdf').code !== 0) {
  shell.echo('Error: Cups Printing failed');
  shell.exit(1);
}