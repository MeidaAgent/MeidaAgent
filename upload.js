const ftp = require("basic-ftp")
const path = require("path")

async function deploy() {
    const client = new ftp.Client()
    client.ftp.verbose = true
    try {
        console.log("Connecting to FTP...")
        await client.access({
            host: "meida.cloud",
            user: "arkavacl",
            password: "Arkava#2026",
            secure: false
        })
        console.log("Connected!")
        
        console.log("Uploading out/ to meida.cloud/ ...")
        // Ensure remote directory exists
        await client.ensureDir("meida.cloud")
        
        // Upload the out directory
        await client.uploadFromDir("out", ".")
        console.log("Upload completed successfully!")
    }
    catch(err) {
        console.error("FTP Error:", err)
    }
    finally {
        client.close()
    }
}

deploy()
