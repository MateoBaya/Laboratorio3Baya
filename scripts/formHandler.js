class FormHandler
{
    constructor(id)
    {
        this.singleton = FormHandler.formByIdGenerator(id);
    }

    get Singleton()
    {
        return this.singleton;
    }

    static formDefaultGenerator()
    {
        formByIdGenerator("formByHandler");  
    }
    
    static formByIdGenerator(id)
    {
        const form = document.createElement("form");
        form.setAttribute("class","mainFormDefault");
        form.setAttribute("id",id);
        form.setAttribute("action","");
        return form;
    }
    
    static inputGenerator(type,name)
    {
        const input = document.createElement("input");
    
        input.setAttribute("type",type);
        input.setAttribute("name",name);
        input.setAttribute("id",name);
        if(type==="text"||type==="number")
        {
            input.setAttribute("placeholder",name.charAt(0).toUpperCase()+name.slice(1));
            input.setAttribute("autocomplete","off");
        }
    
        return input;
    }
    
    static labelGenerator(name)
    {
        const label = document.createElement("label");
        const labelText = document.createTextNode(name.charAt(0).toUpperCase()+name.slice(1)+":");
    
        label.setAttribute("for",name);
        label.appendChild(labelText);
        
        return label;
    }

    static inputButtonGenerator(type,id,value)
    {
        const button = document.createElement("input");
        
        button.setAttribute("type",type);
        button.setAttribute("id",id);
        button.setAttribute("value",value);

        return button;
    }
    
    addGroups(createGroup,id)
    {
        const form = this.singleton;
        const group = document.createElement(createGroup);
        
        group.setAttribute("id",id);
        form.appendChild(group);

        return group;
    }
    
    addInputToForm(type,name)
    {
        const form = this.singleton;
        const input = FormHandler.inputGenerator(type,name);
        const label = FormHandler.labelGenerator(name);
    
        form.appendChild(label);
        form.appendChild(input);
    }

    addButtonToForm(type,id,value)
    {
        const form = this.singleton;
        const button = FormHandler.inputButtonGenerator(type,id,value);

        form.appendChild(button);
    }

    static addNodeToGroup(node,idGroup)
    {
        const group = document.getElementById(idGroup);
        group.appendChild(node);
    }
    
    static addSomethingToGroup(something,value,id,idGroup)
    {
        const group = document.getElementById(idGroup);
        const somethingNode = document.createElement(something);
        const textNode = document.createTextNode(value);

        somethingNode.setAttribute("id",id);
        somethingNode.setAttribute("value",value);
        somethingNode.appendChild(textNode);

        group.appendChild(somethingNode);
    }

    static addInputToGroup(type,name,id)
    {
        const group = document.getElementById(id);
        const input = FormHandler.inputGenerator(type,name);
        const label = FormHandler.labelGenerator(name);
    
        group.appendChild(label);
        group.appendChild(input);
    }
    

}
export default FormHandler;