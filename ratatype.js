
// change according to needs
const pythonPath = '/usr/local/bin/python3';

const CREDS = {
	username: 'youremail@gmail.com',
	password: 'yourpassword'
}

// initiate script
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');


(async () => {
	const login_url = "https://www.ratatype.com/login/";
  	const type_url = "https://www.ratatype.com/typing-test/test/";

  	const browser = await puppeteer.launch({headless: false});
  	const page = await browser.newPage();

	await page.goto(login_url, { waitUntil: 'networkidle0' });
	await page.type('#email', CREDS.username);
  	await page.type('#password', CREDS.password);

  	await Promise.all([
	    page.click('button.btn.btn-default[type="submit"]'),
	    page.waitForNavigation({ waitUntil: 'networkidle0' }),
  	]);

	await page.setViewport({ width: 1366, height: 768});
	await page.bringToFront();
	await page.goto(type_url, { waitUntil: 'networkidle0' });
	await page.click('button#startButton')

	allTexts = await page.evaluate(()=>{
		text = ''
		for(e of document.getElementsByClassName('mainTxt')[0].childNodes){
			text += e.innerText
		}
		return text
	});

	try{
		args = ['keypress.py', allTexts]
		const pythonProcess = spawn(pythonPath, args)

		pythonProcess.stdout.on('data', (data) => {
			console.log(data.toString())
		});

		pythonProcess.stderr.on('data', (data) => {
			console.log(data.toString())
		});
	}
	catch(err){
		console.log(err)
	}
})();