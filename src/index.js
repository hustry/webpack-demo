


if(document.querySelectorAll('a').length){

	require.ensure([],()=>{

		const Button = require('./components/Button.js').default;
		const btn = new Button('google.com');
		btn.render('a');

	});
}


if(document.querySelectorAll('h1').length){
	require.ensure([],()=>{
		const Header = require('./components/Header.js').default;

		new Header().render('h1');
	})
}

