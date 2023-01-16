let formDetail = document.getElementById('form');
//console.log(formDetail);
formDetail.addEventListener('submit',savetodatabase);
function savetodatabase(e){
    e.preventDefault();
    const amount = e.target.amount.value;
    const des = e.target.des.value;
    const catogery = e.target.catogery.value;

    const obj = {
        amount,des,catogery
    }
    console.log(obj);
    axios.post("https://crudcrud.com/api/62a300c18fca46999de4940c88540df7/expences",obj)
    .then((response) =>{
    display(response.data)
    console.log(response);
    
    })
    .catch((Error) => console.log(Error));
}
window.addEventListener("DOMContentLoaded",() =>{
//var putinscreen= window.addEventListener("DOMContentLoaded",() => {
    axios.get("https://crudcrud.com/api/62a300c18fca46999de4940c88540df7/expences")
        .then((response) => {
            console.log(response)

            for(var i = 0;i< response.data.length; i++){
                display(response.data[i])
            }
        })
        .catch((Error) => {
            console.log(Error);
        })

    });

function display(user){
    var displayData = document.getElementById('result');

    var childHtml = `<li id = ${user._id}> ${user.amount} - ${user.des} - ${user.catogery} 
    <button onclick = delet('${user._id}')>DELETE</button>
    <button onclick = editUser('${user._id}','${user.amount}','${user.des}','${user.catogery}')>Edit</button></li>`


    displayData.innerHTML = displayData.innerHTML + childHtml;

    document.getElementById('amount').value = "";
    document.getElementById('des').value = "";
    document.getElementById('catogery').value = "";
   // window.location.reload();
}

function delet(userId){
    axios.delete(`https://crudcrud.com/api/62a300c18fca46999de4940c88540df7/expences/${userId}`)
    .then((response)=>{
        removeuser(userId) 
        //removefromscreen;
    })
    .catch((Error) => console.log(Error));
}

function removeuser(userId){
    const parentNode = document.getElementById('result');
    const childTodelet = document.getElementById(userId);

    if(childTodelet){
        parentNode.removeChild(childTodelet);
    }
}


function editUser(userId,amount,des,catogery){
    axios.get(`https://crudcrud.com/api/62a300c18fca46999de4940c88540df7/expences/${userId}`)
    .then((response) => {
   console.log(userId)
  // console.log(response._id)
    document.getElementById('amount').value = amount;
    document.getElementById('des').value = des;
    document.getElementById('catogery').value = catogery;
   // axios.put(`https://crudcrud.com/ api/d5980d08f8b348ee8eca74768ac3d042/appointmentdata/${userId}`)
    delet(userId);
})
}