const fs = require('fs');
const path = require('path');
const publicPath = fs.readFileSync(path.join(process.cwd(0), '/bin/assets.json'));
const obj = JSON.parse(publicPath);
const jsdom = require('jsdom');
const {JSDOM} = jsdom;
const DOMPath = fs.readFileSync(path.join(process.cwd(),'public/template.html')).toString();
const dom = new JSDOM(DOMPath)
Object.keys(obj).forEach((key)=>{
    let type = Object.keys(obj[key])[0];
    switch(type){
        case 'js':
            const script = dom.window.document.createElement('script');
            script.src=obj[key][type];
            dom.window.document.body.appendChild(script);
            break;
        case 'css':
            const link = dom.window.document.createElement('link');
            link.ref = 'stylesheet';
            link.href = obj[key][type];
            dom.window.document.head.appendChild(link); 
        break;  
    }
})
const html = dom.serialize();
fs.writeFileSync(path.join(process.cwd(), 'public/index.html'),html,"utf-8");