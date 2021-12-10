const { ungzip } = require('node-gzip');
const fs = require('fs');

if(process.argv.length < 3) {

    console.log('Usage: node ldapchecker.js <file>');
    process.exit(1);

}

let directory = process.argv[2];

fs.readdir(directory, (err, files) => {

    if(err) {

        console.log(err);
        process.exit(1);

    }

    files.forEach(file => {

        fs.readFile(directory + '/' + file, (err, data) => {
            
            if(err) {

                console.log(err);
                return;

            }

            ungzip(data).then(ungzipped => {
                
                if(ungzipped.toString().indexOf("jndi:ldap") >= 0){

                    console.log("Found LDAP in " + file);

                }

            }).catch(err => {

            });

        });

        

    });

});
