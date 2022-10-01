export function TableGenerator(array)
{
    const table = document.createElement("table");
    const thead = HeaderGenerator(array);
    
    table.appendChild(thead);
    table.appendChild(BodyGenerator(array,thead.firstElementChild));

    return table;
}

function HeaderGenerator(headerValues)
{
    const thead = document.createElement("thead"),
    tr = document.createElement("tr");
    let inserted = new Array();
    let flag = true;
    headerValues.forEach(element=>{
        Object.keys(element).forEach(value => {
            if(value!=="id"&&!inserted.includes(value))
            {
                inserted.push(value);
                const text = document.createTextNode(value);
                const thNode = document.createElement("th");
                thNode.appendChild(text);
                tr.appendChild(thNode);
                flag=false;
            }
        });
    });
    thead.appendChild(tr);
    return thead;
}

function BodyGenerator(arrayBody,keys)
{
    const tbody = document.createElement("tbody");
    const firstValue = keys.firstElementChild;
    let value = firstValue;
    let keyarray=new Array()
    keyarray.push("id");
    while(value!=null)
    {
        keyarray.push(value.textContent);
        value=value.nextElementSibling;
    }
    
    arrayBody.forEach((element,index) => 
    {
            let i=0;
            const tr = document.createElement("tr");
            tr.classList.add(index%2?"numeroImpar":"numeroPar");
            for(let value in element)
            {

                if(keyarray[i]==value)
                {
                    if(value!="id")
                    {
                        const text = document.createTextNode(element[value]);
                        const tdNode = document.createElement("td");
                        tdNode.appendChild(text);
                        tr.appendChild(tdNode);
                    }
                    else if(value === "id")
                    {
                        tr.setAttribute('data-id',element[value]);
                    }

                    while(i<keyarray.length-1&&i>=6)
                    {
                        const text = document.createTextNode("-");
                        const tdNode = document.createElement("td");
                        tdNode.appendChild(text);
                        tr.appendChild(tdNode);   
                        i++;
                    }
                    i++;
                    
                }
                else
                {
                  
                    while(keyarray[i]!=value&&i<=keyarray.length)
                    {
                        if(value!="id")
                        {
                            const text = document.createTextNode("-");
                            const tdNode = document.createElement("td");
                            tdNode.appendChild(text);
                            tr.appendChild(tdNode);
                        }
                        i++;
                    }
                    i++;
                    const text = document.createTextNode(element[value]);
                     const tdNode = document.createElement("td");
                        tdNode.appendChild(text);
                        tr.appendChild(tdNode);
                        

                }
                
            }
            
            tbody.appendChild(tr);
        }
    );
    return tbody;
}