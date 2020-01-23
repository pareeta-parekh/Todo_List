eventListener()

let arrTasks = [];
let arrCategory = [];
let arrPriority = [];
let k = 0;
let l = 0;

function getArray()
{
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        arrCategory[i] = key;
        const showList_lsc = localStorage.getItem(key);
       // console.log("showlist", showList_lsc);
        const getTaskhome = JSON.parse(showList_lsc);
        
        for(var j = 0; j< getTaskhome.length ; j++)
        {
            if(j%2 == 0)
            {
                arrTasks[k] = getTaskhome[j];
                k++;
            }
            else
            {
                arrPriority[l] = getTaskhome[j];
                l++;
            }
            
        }
    }
}

function eventListener()
{
    //document.querySelector('#form').addEventListener('submit',addList_storage);
    //document.querySelector('#addSubId').addEventListener('submit',addSub_task);
    document.querySelector('#searchId').addEventListener('submit',searchTask);
    document.addEventListener('DOMContentLoaded',showList_storage);
    document.querySelector('#incomplete-tasks').addEventListener('click',editTask);
    document.querySelector('#incomplete-tasks').addEventListener('click',deleteTask);
    document.querySelector('#incomplete-tasks').addEventListener('click',check_property);
}


function deleteTask(e)
{
    if(e.target.classList.contains('delete'))
    {
        console.log("in delete");

        var target = e.target.parentNode.innerHTML;
        var newValue = target.split("<");
       // console.log("aaa" , newValue[0]);
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            const showList_lsc = localStorage.getItem(key);
            const getTaskhome = JSON.parse(showList_lsc);  
            
            for(var j=0; j< getTaskhome.length; j++)
            {
                //console.log("bbb" , getTaskhome[j]);
                if(getTaskhome[j] === newValue[0])
                {  
                    // console.log("in if");
                    getTaskhome.splice(j, 2);
                   localStorage.setItem(key , JSON.stringify(getTaskhome));
                   
                }
            }
       }
    }
}

function editTask(e)
{
    if(e.target.classList.contains('edit')){
        console.log("in edit");

        inputValue = prompt("Enter fileName:");
        var target = e.target.parentNode.innerHTML;
        var newValue = target.split("<");
        //console.log("aaa" , newValue[0]);

        e.target.parentNode.innerHTML = inputValue + '<input type="checkbox" id="chkbx"><button class="edit" id="edit">Edit</button><button class="delete" id="delete">Delete</button>';
       
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            const showList_lsc = localStorage.getItem(key);
            const getTaskhome = JSON.parse(showList_lsc);
            
            
            for(var j=0; j< getTaskhome.length; j++)
            {
                //console.log("bbb" , getTaskhome[j]);
                if(getTaskhome[j] === newValue[0])
                {
                    
                    // console.log("in if");
                    getTaskhome.splice(j, 1);
                    getTaskhome.push(inputValue);
                    localStorage.setItem(key , JSON.stringify(getTaskhome));
                }
            }
        }

        //showList_storage()
        
    }

    else if(e.target.classList.contains('lblKey'))
    {
        console.log("edit key");
        const newValue = e.target.textContent;

        inputValue = prompt("Enter Category Name:");

        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            const showList_lsc = localStorage.getItem(key);
            const getTaskhome = JSON.parse(showList_lsc);
            
            if(key === newValue)
            {
                // console.log("in if");
                //getTaskhome.push("abc");
                localStorage.setItem(inputValue , JSON.stringify(getTaskhome));
                localStorage.removeItem(newValue);
            }
        }
    }
    else if(e.target.classList.contains('prity'))
    {
        console.log("priority");
        const newValue = e.target.textContent;

        var target = document.getElementById("taskName").textContent;
        // console.log(target);
        
        var nextValue = target.split("Edit");

        // console.log(nextValue[0]);

        inputValue = prompt("Enter Priority Name:");

        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            const showList_lsc = localStorage.getItem(key);
            const getTaskhome = JSON.parse(showList_lsc);

            for(var j=0 ; j<getTaskhome.length ; j++)
            {
                if(getTaskhome[j] === newValue && getTaskhome[j-1] === nextValue[0])
                {
                    // console.log("in if");
                    //getTaskhome.splice(j, 1);
                    getTaskhome.splice(j,1,inputValue);
                    //getTaskhome.push(inputValue);
                    localStorage.setItem(key , JSON.stringify(getTaskhome));
                }
            }
        }

    }
    

}

function showList_storage()
{
     for (var i = 0; i < localStorage.length; i++) {
        
        //    console.log("i" , i);
            var key = localStorage.key(i);
            //console.log(key);
            const showList_lsc = localStorage.getItem(key);
            const getTaskhome = JSON.parse(showList_lsc);
            // console.log(getTaskhome);
        if(key != 'completed')
        {
            for(var j=0;j<getTaskhome.length;j++)
            {
                if(getTaskhome[j] == "URGENT" || getTaskhome[j] == "MEDIUM" || getTaskhome[j] == "LOW")
                {
                    // console.log("noo");
                }
                else
                {
                    var priority = document.createElement("label-priority");//priority
                    priority.textContent = getTaskhome[j+1];
                    priority.classList = 'prity';
                    document.querySelector('#incomplete-tasks').appendChild(priority);
                    
                    var br = document.createElement("br");
                    document.querySelector('#incomplete-tasks').appendChild(br);

                    var label_key =document.createElement("label_key");//label
                    label_key.textContent = key;
                    label_key.classList = 'lblKey';
                    document.querySelector('#incomplete-tasks').appendChild(label_key);
                    
                    taskvar = getTaskhome[j]
                    {
                        // console.log("inside  loop");
                        var listItem=document.createElement("li");
                        listItem.id = "liIncomplete";
                    
                        var label =document.createElement("label");//label
                        label.textContent = taskvar;
                        label.innerText=taskvar;
                        label.id = "taskName";
                        listItem.appendChild(label);
                        document.querySelector('#incomplete-tasks').appendChild(listItem);

                        var checkBox=document.createElement("input");//checkbx
                        checkBox.type="checkbox";
                        checkBox.id = "chkbx";
                        checkBox.classList = "chkbx";
                        label.appendChild(checkBox);

                        var editButton=document.createElement("button");//edit button
                        var deleteButton=document.createElement("button");//delete button
                        editButton.innerText="Edit";//innerText encodes special characters, HTML does not.
                        editButton.className="edit";
                        editButton.id = "edit";
                        deleteButton.innerText="Delete";
                        deleteButton.className="delete";
                        deleteButton.id = "delete";
                        label.appendChild(editButton);
                        label.appendChild(deleteButton);
                        // console.log(editButton.parentElement);
                    };
                        
      }
                }
            }

            else{
                showListComplete_Refresh();
            }
    } 
    
    
}
function showList_Complete(newValue_complete)
{
    console.log("in showlist complete");
    // console.log("newValue" , newValue_complete);
     for (var i = 0; i < localStorage.length; i++) {

        var key = localStorage.key(i);
        //console.log(key);
        const showList_lsc = localStorage.getItem(key);
        const getTaskhome = JSON.parse(showList_lsc);

        for(var j=0;j<getTaskhome.length;j++)
        {
            if(getTaskhome[j] === newValue_complete[0])
            {
                var label_key =document.createElement("label_key");//label
                label_key.textContent = key;

                document.querySelector('#completed-tasks').appendChild(label_key);
                
                taskvar = getTaskhome[j];
                console.log("inside  loop");
                var listItem=document.createElement("li");
                listItem.id = "licomplete";
            
                var label =document.createElement("label");//label
                label.textContent = taskvar;
                label.innerText=taskvar;
                label.id = "taskName";
                listItem.appendChild(label);
                document.querySelector('#completed-tasks').appendChild(listItem);

                var checkBox=document.createElement("input");//checkbx
                checkBox.type="checkbox";
                checkBox.id = "chkbx";
                checkBox.classList = "chkbx";
                label.appendChild(checkBox);
                
            }
        }

      }
      
}

function showListComplete_Refresh()
{
    console.log("in showlist complete");
    //console.log("newValue" , newValue_complete);
     //for (var i = 0; i < localStorage.length; i++) {

        //var key = localStorage.key(i);
        //console.log(key);
        const showList_lsc = localStorage.getItem('completed');
        if(showList_lsc != null)
        {
        const getTaskhome = JSON.parse(showList_lsc);
        console.log(getTaskhome);
        for(var j=0;j<getTaskhome.length;j++)
        {
                var label_key =document.createElement("label_key");//label
                label_key.textContent = 'completed';

                document.querySelector('#completed-tasks').appendChild(label_key);
                
                taskvar = getTaskhome[j];
                // console.log("inside  loop");
                var listItem=document.createElement("li");
                listItem.id = "licomplete";
            
                var label =document.createElement("label");//label
                label.textContent = taskvar;
                label.innerText=taskvar;
                label.id = "taskName";
                listItem.appendChild(label);
                document.querySelector('#completed-tasks').appendChild(listItem);

                var checkBox=document.createElement("input");//checkbx
                checkBox.type="checkbox";
                checkBox.id = "chkbx";
                checkBox.classList = "chkbx";
                label.appendChild(checkBox);

            }
        }
        
}

      


function addList_storage(e)
{
    console.log("onclick-add");
    const newItem = document.getElementById("new-task").value;
    const category = document.getElementById("new-category").value;
    const priority = document.getElementById("priority").value;

    if(newItem === "" || category === "")
    {
        alert("Try Again!!");
    }
    else if(priority === 'NONE')
    {
        alert("Choose Priority");
    }
    else
    {
    // console.log(newItem);
    // console.log(category);
    // console.log(priority);

    const lsc = localStorage.getItem(category);
    let tasks;
    if(lsc === null)
    {
        tasks = [];
    }
    else
    {
        tasks = JSON.parse(lsc);
        
    }

    if(tasks.length == 0)
    {
        tasks.push(newItem);
        tasks.push(priority);
        localStorage.setItem(category , JSON.stringify(tasks));
    }
    else
    {
    for(var i = 0; i < tasks.length ; i++)
        {
            if(tasks[i] == newItem)
            {
                alert("Enter New item");
                break;
            }
            else
            {
                console.log("here");
                tasks.push(newItem);
                tasks.push(priority);
                localStorage.setItem(category , JSON.stringify(tasks));
            }
        }
    }
    // console.log(tasks);
    
    //showList_storage(category);
}
    
}

function addSub_task(e)
{
    console.log("onclick-Subadd");
    
    const newItem = document.getElementById("new-task").value;
    const category = document.getElementById("new-category").value; 
    const priority = document.getElementById("priority").value;

    if(newItem === "" || category === "")
    {
        alert("Try Again!");
    }
    else
    {
    const inputValue = prompt("Enter Parent Task");
    const lsc = localStorage.getItem(category);
    const sublsc = localStorage.getItem(inputValue);
    let tasks;
    let subtasks;

    //console.log("sublsc" , sublsc);

    if(sublsc === null)
    {
        subtasks = [];
        // console.log("subtasks" , subtasks);
    }
    else
    {
        
        subtasks = JSON.parse(sublsc);
    }
    //console.log(tasks);
    tasks = JSON.parse(lsc);
    console.log(tasks);
    console.log(inputValue);
    for(var i = 0 ; i < tasks.length ; i++)
    {
        if(tasks[i] === inputValue)
        {
            subtasks.push(newItem);
            subtasks.push(priority);
            localStorage.setItem(inputValue , JSON.stringify(subtasks));
        }
    }
}
}

function searchTask(e)
{
    console.log("in search");
    getArray();
    // console.log("priority" , arrPriority);
    // console.log("tasks" , arrTasks);
    // console.log("keyy" , arrCategory);

    const newItem = document.getElementById("new-task").value;

    if(newItem === "")
    {
        alert("Empty Field");
    }
    else
    {

   
    var findAns = arrTasks.find(function(newItem){
        return newItem;
    });

    document.querySelector('#searchValues').append(findAns);
    // console.log(findAns);
}
}

function searchKey(e)
{
    console.log("in search key");
    getArray();
    // console.log("priority" , arrPriority);
    //console.log("tasks" , arrTasks);
    // console.log("keyy" , arrCategory);

    const newItem = document.getElementById("new-category").value;
    if(newItem === "")
    {
        alert("Empty Field");
    }
    else
    {
    var findAns = arrTasks.find(function(newItem){
        return newItem;
    });
        const show_key = localStorage.getItem(newItem);
        const show = JSON.parse(show_key);
       
       // console.log(show);

        for(var i = 0 ;i<show.length;i++)
        {
           // console.log("in for");
            if(i%2 == 0)
            {
                //console.log(show[i]);

                document.querySelector('#searchValues').append(show[i]);
                var br = document.createElement('br');
                document.querySelector('#searchValues').appendChild(br);
                
            }
        }

    }
}

function sortPriority(e)
{
    var key;
    let s = 0;
    const sortP = [];
    for (var i = 0; i < localStorage.length; i++) {
         key = localStorage.key(i);
        
        
        const showList_lsc = localStorage.getItem(key);
       // console.log("showlist", showList_lsc);
        const getTaskhome = JSON.parse(showList_lsc);
        
        for(var j = 0; j< getTaskhome.length ; j++)
        {
            
            if(j%2 == 0)
            {
                sortP[s] = key;
                s++;
                sortP[s] = getTaskhome[j];
                s++;
            }
            else
            {
                sortP[s] = getTaskhome[j];
                s++;
            }
            
        }
    }

    // console.log(sortP);
    const listSort = [];

    while(sortP.indexOf('URGENT') !== -1)
    {
        let index = sortP.indexOf('URGENT');
        // console.log(index);
        listSort.push(sortP[index-2]);
        listSort.push(sortP[index-1]);
        listSort.push(sortP[index]);
        sortP.splice(index-2, 3);
    }
    while(sortP.indexOf('MEDIUM') !== -1)
    {
        let index = sortP.indexOf('MEDIUM');
        // console.log(index);
        listSort.push(sortP[index-2]);
        listSort.push(sortP[index-1]);
        listSort.push(sortP[index]);
        sortP.splice(index-2, 3);
    }
    while(sortP.indexOf('LOW') !== -1)
    {
        let index = sortP.indexOf('LOW');
        // console.log(index);
        listSort.push(sortP[index-2]);
        listSort.push(sortP[index-1]);
        listSort.push(sortP[index]);
        sortP.splice(index-2, 3);
    }

    // console.log(listSort);
    document.getElementById('incomplete-tasks').innerHTML = " ";
    for(var ls=0;ls<listSort.length;)
    {
    
    var priority = document.createElement("label-priority");//priority
                    priority.textContent = listSort[ls+2];
                    priority.classList = 'prity';
                    document.querySelector('#incomplete-tasks').appendChild(priority);
                    
                    var br = document.createElement("br");
                    document.querySelector('#incomplete-tasks').appendChild(br);

                    var label_key =document.createElement("label_key");//label
                    label_key.textContent = listSort[ls];
                    label_key.classList = 'lblKey';
                    document.querySelector('#incomplete-tasks').appendChild(label_key);
                    
                        //console.log("inside  loop");
                        var listItem=document.createElement("li");
                        listItem.id = "liIncomplete";
                    
                        var label =document.createElement("label");//label
                        label.textContent = listSort[ls+1];
                        label.innerText=listSort[ls+1];
                        label.id = "taskName";
                        listItem.appendChild(label);
                        document.querySelector('#incomplete-tasks').appendChild(listItem);

                        var checkBox=document.createElement("input");//checkbx
                        checkBox.type="checkbox";
                        checkBox.id = "chkbx";
                        checkBox.classList = "chkbx";
                        label.appendChild(checkBox);

                        var editButton=document.createElement("button");//edit button
                        var deleteButton=document.createElement("button");//delete button
                        editButton.innerText="Edit";//innerText encodes special characters, HTML does not.
                        editButton.className="edit";
                        editButton.id = "edit";
                        deleteButton.innerText="Delete";
                        deleteButton.className="delete";
                        deleteButton.id = "delete";
                        label.appendChild(editButton);
                        label.appendChild(deleteButton);
                        // console.log(editButton.parentElement);
                        ls = ls + 3;
                    }
}

function check_property(e)
{
    let dupli_tasks;
    console.log("in check");
    if(e.target.classList.contains('chkbx'))
    {
        // console.log("in check 2");
        var x = e.target.checked;
        // console.log(x);
        var target = document.getElementById("chkbx").parentElement.innerHTML;
        const newValue_complete = target.split("<");
            
            if(x === true)
            {
                // console.log("in if");
                showList_Complete(newValue_complete);
                e.target.parentElement.remove();
                if(1)
                {
                    // console.log("in complete delete");

                    var target = e.target.parentNode.innerHTML;
                    var newValue = target.split("<");
                    
                // console.log("aaa" , newValue[0]);
                    for (var i = 0; i < localStorage.length; i++) {
                        var key = localStorage.key(i);
                        const showList_lsc = localStorage.getItem(key);
                        const getTaskhomea = JSON.parse(showList_lsc);  

                        const complete = localStorage.getItem("completed");
                        

                        if(complete === null)
                        {
                            dupli_tasks = [];
                        }
                        else
                        {
                            dupli_tasks = JSON.parse(complete);
                        }
                        for(var j=0; j< getTaskhomea.length; j++)
                        {
                            //console.log("bbb" , getTaskhomea[j]);
                            if(getTaskhomea[j] === newValue[0])
                            {  
                                // console.log(getTaskhomea[j]);
                                //dupli_tasks = getTaskhomea[j];
                                dupli_tasks.push(getTaskhomea[j]);
                                // console.log(dupli_tasks);
                                
                                localStorage.setItem("completed" , JSON.stringify(dupli_tasks));
                                if(key != 'completed')
                                {
                                getTaskhomea.splice(j, 2);
                                // console.log(key);
                                localStorage.setItem(key , JSON.stringify(getTaskhomea));
                                }
                            }
                        }
                        document.getElementById('incomplete-tasks').innerHTML = ""  ;
                        
                }
                }
                
                
                let a = JSON.parse(localStorage.getItem('completed'));
                a.splice(a.length-1, 1);
                // console.log(a);
                localStorage.setItem("completed" , JSON.stringify(a));
                showList_storage();
                showListComplete_Refresh();
            }
            else
            {
                showList_storage();
            }
        
    }

    showListComplete_Refresh();
    window.location.reload();
}

