.. _list-of-grid-cas:

****************
List of Grid CAs
****************

If Dutchgrid or Digicert is not an option for you, please have a look at the following list of Certificate Authorities that are supported on the grid.

  .. code-block:: console

    $10:30 ui.grid.sara.nl:/home/homer 
    $homer$ for rootcert in /etc/grid-security/certificates/*.pem ; do openssl x509 -in $rootcert -noout -subject ; done | sed -e 's/^subject= //' | sort
    /C=AE/O=DarkMatter LLC/CN=DarkMatter Assured CA
    /C=AE/O=DarkMatter LLC/CN=DarkMatter Secure CA
    /C=AM/O=ArmeSFo/CN=ArmeSFo CA
    /C=AR/O=e-Ciencia/OU=UNLP/L=CeSPI/CN=PKIGrid
    /C=AT/O=AustrianGrid/OU=Certification Authority/CN=Certificate Issuer
    /C=BM/O=QuoVadis Limited/CN=QuoVadis Grid ICA G2
    /C=BM/O=QuoVadis Limited/CN=QuoVadis Root CA 2
    /C=BM/O=QuoVadis Limited/CN=QuoVadis Root CA 2 G3
    /C=BM/O=QuoVadis Limited/CN=QuoVadis Root CA 3 G3
    /C=BM/O=QuoVadis Limited/OU=Issuing Certification Authority/CN=QuoVadis Grid ICA
    /C=BM/O=QuoVadis Limited/OU=Root Certification Authority/CN=QuoVadis Root Certification Authority
    /C=BR/O=ANSP/OU=ANSPGrid CA/CN=ANSPGrid CA
    /C=CA/O=Grid/CN=Grid Canada Certificate Authority
    /C=CL/O=REUNACA/CN=REUNA Certification Authority
    /C=CN/O=HEP/CN=Institute of High Energy Physics Certification Authority
    /C=CY/O=CyGrid/O=HPCL/CN=CyGridCA
    /C=DE/O=DFN-Verein/OU=DFN-PKI/CN=DFN SLCS-CA
    /C=DE/O=DFN-Verein/OU=DFN-PKI/CN=DFN-Verein PCA Grid - G01
    /C=DE/O=GermanGrid/CN=GridKa-CA
    /C=EG/O=EG-GRID/CN=EG-GRID Certification Authority
    /C=FR/O=CNRS/CN=CNRS2
    /C=FR/O=CNRS/CN=CNRS2-Projets
    /C=FR/O=CNRS/CN=GRID2-FR
    /C=GB/ST=Greater Manchester/L=Salford/O=COMODO CA Limited/CN=COMODO RSA Certification Authority
    /C=GB/ST=Greater Manchester/L=Salford/O=Comodo CA Limited/CN=AAA Certificate Services
    /C=GR/O=HellasGrid/OU=Certification Authorities/CN=HellasGrid CA 2016
    /C=HR/O=edu/OU=srce/CN=SRCE CA
    /C=HU/O=NIIF/OU=Certificate Authorities/CN=NIIF Root CA 2
    /C=IR/O=IPM/O=IRAN-GRID/CN=IRAN-GRID CA
    /C=IR/O=IPM/OU=GCG/CN=IRAN-GRID-G2 CA
    /C=IT/O=INFN/CN=INFN Certification Authority
    /C=JP/O=KEK/OU=CRC/CN=KEK GRID Certificate Authority
    /C=JP/O=NII/OU=HPCI/CN=HPCI CA
    /C=KR/O=KISTI/O=GRID/CN=KISTI Grid Certificate Authority
    /C=MA/O=MaGrid/CN=MaGrid CA
    /C=MK/O=MARGI/CN=MARGI-CA
    /C=MX/O=UNAMgrid/OU=UNAM/CN=CA
    /C=NL/O=NIKHEF/CN=NIKHEF medium-security certification auth
    /C=NL/O=TERENA/CN=TERENA eScience Personal CA
    /C=NL/O=TERENA/CN=TERENA eScience SSL CA
    /C=NL/ST=Noord-Holland/L=Amsterdam/O=TERENA/CN=TERENA eScience Personal CA 2
    /C=NL/ST=Noord-Holland/L=Amsterdam/O=TERENA/CN=TERENA eScience Personal CA 3
    /C=NL/ST=Noord-Holland/L=Amsterdam/O=TERENA/CN=TERENA eScience SSL CA 2
    /C=NL/ST=Noord-Holland/L=Amsterdam/O=TERENA/CN=TERENA eScience SSL CA 3
    /C=PK/O=NCP/CN=PK-GRID-CA
    /C=PL/O=GRID/CN=Polish Grid CA
    /C=PT/O=LIPCA/CN=LIP Certification Authority
    /C=RS/O=AEGIS/CN=AEGIS-CA
    /C=RU/O=RDIG/CN=Russian Data-Intensive Grid CA
    /C=SE/O=AddTrust AB/OU=AddTrust External TTP Network/CN=AddTrust External CA Root
    /C=SI/O=SiGNET/CN=SiGNET CA
    /C=SK/O=SlovakGrid/CN=SlovakGrid CA
    /C=TR/O=TRGrid/CN=TR-Grid CA
    /C=TW/O=AS/CN=Academia Sinica Grid Computing Certification Authority Mercury
    /C=UK/O=eScienceCA/OU=Authority/CN=UK e-Science CA 2B
    /C=UK/O=eScienceRoot/OU=Authority/CN=UK e-Science Root
    /C=US/O=DigiCert Grid/OU=www.digicert.com/CN=DigiCert Grid Trust CA
    /C=US/O=DigiCert Grid/OU=www.digicert.com/CN=DigiCert Grid Trust CA G2
    /C=US/O=DigiCert Inc/OU=www.digicert.com/CN=DigiCert Assured ID Root CA
    /C=US/O=Internet2/OU=InCommon/CN=InCommon IGTF Server CA
    /C=US/O=National Center for Supercomputing Applications/OU=Certificate Authorities/CN=MyProxy CA 2013
    /C=US/O=National Center for Supercomputing Applications/OU=Certificate Authorities/CN=Two Factor CA 2013
    /C=US/O=Pittsburgh Supercomputing Center/CN=PSC MyProxy CA
    /C=US/ST=New Jersey/L=Jersey City/O=The USERTRUST Network/CN=USERTrust RSA Certification Authority
    /C=US/ST=UT/L=Salt Lake City/O=The USERTRUST Network/OU=http://www.usertrust.com/CN=UTN-USERFirst-Client Authentication and Email
    /C=US/ST=UT/L=Salt Lake City/O=The USERTRUST Network/OU=http://www.usertrust.com/CN=UTN-USERFirst-Hardware
    /C=ch/O=CERN/CN=CERN Root Certification Authority 2
    /DC=BR/DC=UFF/DC=IC/O=UFF LACGrid CA/CN=UFF Latin American and Caribbean Catch-all Grid CA
    /DC=CN/DC=Grid/CN=Root Certificate Authority at CNIC
    /DC=CN/DC=Grid/DC=SDG/CN=Scientific Data Grid CA - G2
    /DC=DZ/DC=ARN/O=DZ e-Science GRID/CN=DZ e-Science CA
    /DC=GE/DC=TSU/CN=TSU Root CA
    /DC=HK/DC=HKU/DC=GRID/CN=HKU Grid CA
    /DC=IN/DC=GARUDAINDIA/CN=Indian Grid Certification Authority
    /DC=MD/DC=MD-Grid/O=RENAM/OU=Certification Authority/CN=MD-Grid CA
    /DC=MY/DC=UPM/DC=MYIFAM/C=MY/O=MYIFAM/CN=Malaysian Identity Federation and Access Management
    /DC=ORG/DC=SEE-GRID/CN=SEE-GRID CA 2013
    /DC=RO/DC=RomanianGRID/O=ROSA/OU=Certification Authority/CN=RomanianGRID CA
    /DC=bg/DC=acad/CN=BG.ACAD CA
    /DC=by/DC=grid/O=uiip.bas-net.by/CN=Belarusian Grid Certification Authority
    /DC=ch/DC=cern/CN=CERN Grid Certification Authority
    /DC=ch/DC=cern/CN=CERN LCG IOTA Certification Authority
    /DC=com/DC=DigiCert-Grid/O=DigiCert Grid/CN=DigiCert Grid CA-1
    /DC=com/DC=DigiCert-Grid/O=DigiCert Grid/CN=DigiCert Grid CA-1 G2
    /DC=com/DC=DigiCert-Grid/O=DigiCert Grid/CN=DigiCert Grid Root CA
    /DC=cz/DC=cesnet-ca/O=CESNET CA/CN=CESNET CA 3
    /DC=cz/DC=cesnet-ca/O=CESNET CA/CN=CESNET CA Root
    /DC=es/DC=irisgrid/CN=IRISGridCA
    /DC=gov/DC=fnal/O=Fermilab/OU=Certificate Authorities/CN=Kerberized CA HSM
    /DC=ke/DC=kenet/O=Kenya Education Network Trust/OU=Research Services/CN=KENET CA
    /DC=ke/DC=kenet/O=Kenya Education Network Trust/OU=Research Services/CN=KENET ROOT CA
    /DC=me/DC=ac/DC=MREN/CN=MREN-CA
    /DC=net/DC=ES/OU=Certificate Authorities/CN=NERSC Online CA
    /DC=nl/DC=dutchgrid/O=Certification Authorities/CN=DCA Root G1 CA
    /DC=nl/DC=e-infra/OU=Certification Authorities/CN=Worthless NL e-Infra Zero Tutorial CA 1
    /DC=org/DC=cilogon/C=US/O=CILogon/CN=CILogon OSG CA 1
    /DC=org/DC=cilogon/C=US/O=CILogon/CN=CILogon Silver CA 1
    /DC=org/DC=egee-ne/OU=Training Services/CN=Worthless EGEE Northern and Benelux Tutorial CA 1
    /DC=org/DC=ugrid/CN=UGRID CA
    /O=Grid/O=NorduGrid/CN=NorduGrid Certification Authority 2015
