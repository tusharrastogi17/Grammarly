let input = document.querySelector('input');
let textarea = document.querySelector('textarea');
let displayText = document.querySelector("#display");
  

input.addEventListener('change', () => {
	
    let files = input.files;
    const file = files[0];
  
    let reader = new FileReader();
  
    reader.addEventListener("load",function(e){

	
        const file = e.target.result;
        //const lines = file.split(/\r\n|\n/);
        textarea.value = file;
		displayText.innerHTML=file;
	
  
    });
    //reader.onerror = (e) => alert(e.target.error.name);
    reader.readAsText(file);
	
	setTimeout(function()
	{
		grammarly();}, 1000);
	
});


function grammarly(){
	input.value=null; //not sure why we have done this
	console.log(textarea.value);
	let rows = textarea.value.split("\n");
	console.log(rows);
	
	rows.forEach(async (row) => {
		return fetch(
			`https://api.textgears.com/spelling?text=${row}&language=en-GB&whitelist=&dictionary_id=&key=LNxYPTm5rTV38QaU`
		)
		.then((res) =>{
			return res.json();
		})
		.then((data) =>{
			data.response.errors.forEach((word) =>{
				
				let suggestion = "";
				word.better.forEach((element, index) => {
					suggestion += `<li "${word.bad}-${index}">${element}</li>`;
			
				});


					let newHtml = `<div style="color:red">${word.bad}<span style="my:hover{ cursor:pointer}"><ul>${suggestion}</ul></span></div>`;
          			displayText.innerHTML = displayText.innerHTML.replaceAll(
            			word.bad,
            			newHtml
          			);
					console.log(textarea.innerHTML);
				
			});
		});
	});
		
}


//LNxYPTm5rTV38QaU 




/*const file= document.getElementById("inputfile");

    file.addEventListener('change', function(){

        var file = fil
		var fr= new FileReader();
        fr.onload=function(){
            document.getElementById('output')
                .textContent=fr.result;
        }

        fr.readAsText(this.files[0]);
        console.log(fr);
    })

*/