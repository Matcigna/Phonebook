const RegexNumber = new RegExp("^[0-9]{6,10}$");
const RegexTag = new RegExp("^[a-zA-Z]{1,10}$");
const RegexName = new RegExp("^[a-zA-Z0-9_]{1,20}$");

//------------------- Class to create the DATA -------------------//
//Class Number
class Number {
    constructor (number,tag="Undefined") {
        if (this.#validationNumberDetails(number,tag)) {
            this.Number=number;
            this.Tag=tag;
            this.UUid=crypto.randomUUID();
            //this.UUid=Date.now();
        }
    }

    #validationNumberDetails(number,tag) {
        if (RegexNumber.test(number) && RegexTag.test(tag)) {
            return true;
        } else {
            throw new Error(`Number details not valid for: ${tag}, ${number}`)
        }
    }

    display (){
        if (this.Tag!="Undefined") {
            console.log(`   ** ${this.Tag} : ${this.Number}`);
        } else {
            console.log(`   ** ${this.Number} `);
        }
    }

    modify(number) {
        if (number instanceof Number) {
                this.Number=number.Number;
                this.Tag=number.Tag;
        } else {
            throw new Error (number, `This argument is not a class Number`)
        }
    }
}

//Class Contact
class Contact {
    constructor (name,privacy=false) {
        if (this.#validationContactDetails(name, privacy)) {
            this.Name= name;
            this.Numbers=[];
            this.IsPrivate=privacy;
            this.UUid=crypto.randomUUID();
            //this.UUid=Date.now();
        }
    }

    #validationContactDetails(name, privacy) {
        if (RegexName.test(name) && (typeof privacy== "boolean")) {
            return true;
        } else {
            throw new Error(`Contact details not valid for: ${name}, ${privacy}`)
        }   
    }

    #validationClassNumber(number) {
        if (!number instanceof Number) {
            throw new Error (number,`this argument is not a class Number`);
        } else {
            return true;
        }
    }

    clear() {
        this.Numbers=[];
    }

    
    display () {
        //console.log("*" + this.Name + this.Numbers.reduce((accu, number) => {
            //let stringNum=number.display();
        //    accu=accu + number.display() + "-";
        //},""));

        console.log(" - " + this.Name + " -");
        this.Numbers.sort((num1,num2) => { 
            if (num1.Tag > num2.Tag) {return 1}
            else if ( num1.Tag < num2.Tag) {return -1}
            else return 0
        }).forEach(number => {
            number.display();
        })
    }

    addNumber(number) {
        if (this.#validationClassNumber(number)) {
            if (!this.#getNumber(number)) {
                this.Numbers.push(number);
                return(number);
            } else {
                console.log(number,`${number.Tag} / ${number.Number}  is already in ${this.Name}`)
            }
        }
    }

    addNumbers(numbers) {
        numbers.forEach(number => {
            this.addNumber(number);
        });
    }
    
    #getNumber (number) {
        return this.Numbers.find(number=> {return number.UUid==number.UUid});
    }
    
    deleteNumber(number) {
        if ( this.#validationClassNumber(number)) {
            if (this.#getNumber(number)) {
                this.Numbers=this.Numbers.filter(number => {return number.UUid!=number.UUid});
            } else {
                throw new Error (number, `${number.Tag} / ${number.Number} is not part of ${this.Name}`)
            }
        }
    }

    deleteNumbers(numbers) {
        numbers.forEach(number => {
            this.deleteNumber(number);
        });
    }

    replaceNumbers(numbers) {
        this.clear();
        numbers.forEach(number=> {
            this.addNumber(number);
        });
    }

    modify (contact) {
        if (number instanceof Contact) {
                this.Name = contact.Name;
                this.Privacy=contact.IsPrivate;
                this.Numbers=contact.Numbers;
        } else {
            throw new Error (contact, `This argument is not a class Contact`);
        }
    }
}

//Class Phonebook
class Phonebook {
    
    constructor (name) {
        if (this.#validationPhonebookDetails(name)) {
            this.Name=name;
            this.Contacts=[];
            this.UUid=crypto.randomUUID();
            //this.UUid=Date.now();
        }
    }

    #validationPhonebookDetails (name) {
        if (RegexName.test(name)) {
            return true;
        } else {
            throw new Error(`Phonebook details not valid for: ${name}`)
        }  
    }

    #validationClassContact(contact) {
        if (!contact instanceof Contact) {
            throw new Error (contact,`This argument is not a class Contact`);
        } else {
            return true;
        }
    }

    clear () {
        this.Contacts=[];
    }

    display () {
        console.log(this.Name + " :");
        this.Contacts.filter(contact => {
            if (!contact.IsPrivate) {
                return true;
            } else return false;
        }).sort((contact1,contact2) => {
            if (contact1.Name > contact2.Name) return 1
            else if (contact1.Name < contact2.Name) return -1
            else return 0
        }).forEach(contact => {
            contact.display();
       });    
    }

    #getContact (contact) {
        if (this.#validationClassContact(contact)) {
            return(this.Contacts.find(contact=> {return contact.UUid == contact.UUid}))
        }
    }

    addContact (contact) {
        if (this.#validationClassContact(contact)) {
            if(!this.#getContact(contact)) {
                this.Contacts.push(contact);
                return(contact);  
            } else {
                console.log(contact,`${contact.Name} is already in ${this.Name}.`);
            }
        }
    }

    addContacts(contacts) {
        contacts.forEach(contact => {
            this.addContact(contact);
        });
    }

    deleteContact (contact) {
        if (this.#validationClassContact(contact)) {
            if(this.#getContact(contact)) {
                this.Contacts=this.Contacts.filter(contact => {
                return (contact.UUid!=contact.UUid)     
            });
            }
        }
    }

    deleteContacts(contacts){
        contacts.forEach(contact=> {
            this.deleteContact(contact);
        }); 
    }

    replaceContacts(contacts) {
        this.clear();
        contacts.forEach(contact => {
            this.addContact(contact);
        });
    }

    modify (phonebook) {
        if (phonebook instanceof Phonebook) {
            this.Name=phonebook.Name;
            this.Contacts=phonebook.Contacts;
        } else {
            throw new Error (phonebook, `This argument is not a class Phonebook`);
        }
    }
}

//Class Catalog
class Catalog {
    constructor (name){
        if(this.#validationCatalogDetails(name)){
            this.Name=name;
            this.Phonebooks=[];
            this.UUid=crypto.randomUUID();
            //this.UUid=Date.now();
        }
    }

    #validationCatalogDetails (name) {
        if (RegexName.test(name)) {
            return true;
        } else {
            throw new Error(`Catalog details not valid for: ${name}`)
        }  
    }

    #validationClassPhonebook(phonebook) {
        if (!phonebook instanceof Phonebook) {
            throw new Error (phonebook,`This argument is not a class Phonebook`);
        } else {
            return true;
        }
    }

    clear () {
        this.Phonebooks=[];
    }
    
    display () {
        this.Phonebooks.sort((phonebook1,phonebook2)=>{
            if (phonebook1.Name>phonebook2.Name) return 1
            else if (phonebook1.Name<phonebook2.Name) return -1
            else return 0
        }).forEach(phonebook => {
            phonebook.display();
       });    
    }
    
    #getPhonebook (phonebook) {
        if (this.#validationClassPhonebook(phonebook)){
            return this.Phonebooks.find(phonebook=> {return phonebook.UUid == phonebook.UUid});
        }
    }

    addPhonebook (phonebook) {
        if (this.#validationClassPhonebook(phonebook)) {
            if(!this.#getPhonebook(phonebook)) {
                this.Phonebooks.push(phonebook);
                return(phonebook);
            } else {
                console.log(phonebook, `${phonebook.Name} is already in ${this.Name}.`);
            }
        }
    }
    
    addPhonebooks(phonebooks) {
        phonebooks.forEach(phonebook => {
            this.addPhonebook(phonebook);
        });
    }

    deletePhonebook(phonebook) {
        if (this.#validationClassPhonebook(phonebook)) {
            this.Phonebooks=this.Phonebooks.filter(phonebook => {
                if (phonebook.UUid==phonebook.UUid) {
                    return false;
                }
                else return true;
            });
        }
    }

    deletePhonebooks(phonebooks) {
        phonebooks.forEach(phonebook => {
            this.deletePhonebook(phonebook);
        });
    }

    replacePhonebooks(phonebooks) {
        this.clear();
        phonebooks.forEach(phonebook => {
            this.addPhonebook(phonebook);
        });
    }

}

//------------------- Class to create the HTML -------------------//
class Dropdown {
    constructor (container) {
        this.container=container;
        this.trigger=container.querySelector('.triggerDrop');
        this.content = container.querySelector('.contentDrop');
    }

    init(){
        this.trigger.addEventListener('click', ()=> {
            if (!this.trigger.classList.contains('private')) {
                this.trigger.classList.toggle('active');
                this.content.classList.toggle('active');
            } else (console.log("This Private contact can't be displayed."))
        });
    }
}

class Tabs {
    constructor (container) {
        this.container = container;
        this.tabs=container.querySelectorAll(".triggerTab");
    }

    init() {
        this.tabs.forEach(tab=> {
            tab.addEventListener('click', e=> {
                this.toggleTabs(e);
                this.toggleContent(e);
            });
        })
    }
    
    toggleTabs(e) {
        //Remove the class active to all tabs to make them disappear
        this.tabs.forEach(tab => tab.classList.remove('active'));
        // add the active tab to the one clicked
        e.target.classList.add('active');
    }

    toggleContent(e) {
        //Remove the class active to all content of the tabs to make them disappear
        this.container.querySelectorAll('.contentTab').forEach(item => {
            item.classList.remove('active');
        });

        const selector=e.target.getAttribute('data-target');
        // add the active class to the content tagged with the data-target
        const content = document.getElementById(selector);
        content.classList.add('active');
    }
}


const newCatalog=new Catalog("NewCatalog");

function createHTMLContact(contact,PB){
    let contactDrop=document.createElement("div");
    contactDrop.classList.add("dropdown");
    PB.appendChild(contactDrop);
    
    let contactTrigger=document.createElement("div");
    contactTrigger.classList.add("triggerDrop");
    contactDrop.appendChild(contactTrigger);

    if (contact.IsPrivate) {
        contactTrigger.innerHTML=`${contact.Name} : Private`;
        contactTrigger.classList.add("private");
    } else {
        contactTrigger.innerHTML=`${contact.Name}`;
    }

    contactDrop.appendChild(contactTrigger);
    let contactTriggerContent=document.createElement("div");
    contactTriggerContent.classList.add("contentDrop");
    contactDrop.appendChild(contactTriggerContent);

    contact.Numbers.sort((num1,num2) => {
        if (num1.Tag > num2.Tag) return 1
        else if (num1.Tag < num2.Tag) return -1
        else return 0
    }).forEach(number => {
        let ListNum=document.createElement("p");
        if (number.Tag!="Undefined") {
            ListNum.innerHTML=`${number.Tag} : ${number.Number}`;
        } else {
            ListNum.innerHTML=`${number.Number}`;
        }
        contactTriggerContent.appendChild(ListNum);
    });
    
}

function createHTMLPhonebook(phonebook,HTMLTabs,listPB,counter){
    let PB=document.createElement("div");
    PB.setAttribute("id",`${phonebook.Name}`);
    PB.classList.add("contentTab");
    HTMLTabs.appendChild(PB);

    let PBList=document.createElement("li");
    PBList.classList.add("triggerTab");
    PBList.innerHTML=`${phonebook.Name}`;
    PBList.setAttribute("data-target",`${phonebook.Name}`)
    listPB.appendChild(PBList);

    let PBTitle=document.createElement("h3");
    PBTitle.innerHTML=`List of contact in ${phonebook.Name}`;
    if (counter==0) {
        PBList.classList.add("active");
        PB.classList.add("active");
    }
    
    phonebook.Contacts.sort((contact1,contact2) => {
        if (contact1.Name > contact2.Name) return 1
        else if (contact1.Name < contact2.Name) return -1
        else return 0
    }).forEach(contact =>{
        createHTMLContact(contact,PB);
    });
}

function refreshHTML() {
    let HTMLTabs=document.querySelector('.tabs');
    HTMLTabs.innerHTML="";
    let listPB=document.createElement("ul");
    HTMLTabs.appendChild(listPB);
    let counter=0;
    newCatalog.Phonebooks.sort((phonebook1,phonebook2) => {
        if (phonebook1.Name > phonebook2.Name) return 1
        else if (phonebook1.Name < phonebook2.Name) return -1
        else return 0
    }).forEach(phonebook => {
        createHTMLPhonebook(phonebook,HTMLTabs, listPB,counter);
        counter++;
    });

    //create drops doown
    const dropdowns= document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const instance = new Dropdown(dropdown);
        instance.init();
    });

    //create tabs
    const tabs= new Tabs(HTMLTabs);
    tabs.init();
}