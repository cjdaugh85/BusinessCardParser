# BusinessCardParser

My take on the Business Card OCR Programming Challenge.

This project is written in Javascript leveraging Node.js.  In order to run this application NodeJs and NPM will need to be installed.

This project was created on Linux using node version 8.11.1, which can be downloaded below.  Any version of Node above v6.x should be fine. 

Windows:

    32-bit: https://nodejs.org/dist/v8.11.1/node-v8.11.1-x86.msi
    
    64-bit: https://nodejs.org/dist/v8.11.1/node-v8.11.1-x64.msi

Linux:

    32-bit https://nodejs.org/dist/v8.11.1/node-v8.11.1-linux-x86.tar.xz

    64-bit: https://nodejs.org/dist/v8.11.1/node-v8.11.1-linux-x64.tar.xz

To ensure NodeJs is properly installed, simply run the following:
 
    node -v

If you see a version number (like 8.11.1) then it was successfully installed.

After ensuring NodeJs has been installed, run the command:

    npm -v
    
   This will ensure that NPM is installed.  If you see a version number, you have successfully installed NPM as well.

INSTALLATION:

After checking out the project, navigate to the "BusinessCardParser" directory.  Once there, run the command 
    
    npm install
      
This should download all the required modules into a "node_modules" directory.

From here, there are two ways to test the application.

1. TEST CLASS

    To verify the application works properly, navigate to the BusinessCardParser directory and run
     
        npm test 

    This will run a test which processes the three examples and prints out the expected results.
    
2. COMMAND LINE

    To run the application via the command line, navigate to the BusinessCardParser directory and run one of the following:
    
        node index.js "ASYMMETRIK LTD\\nMike Smith\\nSenior Software Engineer\\n(410)555-1234\\nmsmith@asymmetrik.com"
        node index.js "Foobar Technologies\\nAnalytic Developer\\nLisa Haung\\n1234 Sentry Road\\nColumbia, MD 12345\\nPhone: 410-555-1234\\nFax: 410-555-4321\\nlisa.haung@foobartech.com"
        node index.js "Arthur Wilson\nSoftware Engineer\nDecision & Security Technologies\nABC Technologies\n123 North 11th Street\nSuite 229\nArlington, VA 22209\nTel: +1 (703) 555-1259\nFax: +1 (703) 555-1200\nawilson@abctech.com"

    Each of these commands will run the BusinessCardParser application with one of the provided examples.  Each at the end will print the expected result for that example. 
  




