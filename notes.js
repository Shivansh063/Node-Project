const fs = require('fs');
const chalk = require('chalk');

/* addNotes() will add following Note(title, Body) to previous notes
 array.filter() is used to filter out array elements according to the condition.
 performing validations like duplicate title and pushing note in the form of Object.
 Arrow function is used to shorten function.
*/
const addNotes = (title,body) => {
    const notes = loadNotes();
    const duplicateArray = notes.filter((note) => note.title !==title);
    if(!((duplicateArray.length !== notes.length) && (notes.length > 0))) {
        duplicateArray.push({
            title : title,
            body : body
        })
        saveNotes(duplicateArray); 
        console.log("New Note Added !!");
    }
    else{
        console.log("Title Already Exists");
    }
}

/*saveNotes() is accepting single argument array(List of Notes)
 Converting array into JSON data format using in-built function stringfy()
 Stored JSON format data onto a file with json extension
 writeFileSync() is used to overlap old data and write new data into file. It also
 creates file if not found.
*/
const saveNotes = (noteData) => {
    const dataJson = JSON.stringify(noteData);
    fs.writeFileSync('firstFile.json',dataJson);
}

/*loadNotes() is used to load JSON format data from firstFile.json
 readFileSync() is used to read file data in binary format 
 So, converted into string format using toString() 
 Using Try Catch block to return empty array if any error occurs
*/
const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('firstFile.json');
        const dataString = dataBuffer.toString();
        return JSON.parse(dataString);
    }
    catch(e){
        return [];
    }
}

/*removeNote() with single arument title is used to remove note by searching
 title from previous data. If found, filter method will remove entire note
 Message will be on console accordingly
*/
const removeNote = (title) => {
    const loadNote = loadNotes();
    
        loadNot = loadNote.filter((note) => note.title !== title);
    
        if(loadNot.length === loadNote.length){
            console.log(chalk.inverse.red("No Note Found !"));
        }
        else{
            console.log(chalk.inverse.green("Note Removed Successfully"));
            saveNotes(loadNot);
        }
}

/*listNote() is a Arrow function to print title and body of every Note
 on console if found else "No Data Found" will be on console.
*/
const listNote = () => {
    const myNotes = loadNotes();
    if(myNotes.length === 0){
        console.log("No Data Found");
    }
    else{
        console.log(chalk.inverse.red("Your Notes ....."));
        myNotes.forEach(element => {
            console.log(element.title + " :- " + element.body );
        });
    }
}
/*readNote() - Arrow function to print particular Title and Body on console if found.
 array.find() will find particular Note by comparing with argument 'title'.
*/
const readNote = (title) => {
    const readingNotes = loadNotes();
    if(readingNotes.length === 0){
        console.log("No Data Found");
    }
    else{
        const requiredTitle = readingNotes.find((note) => note.title === title);
        console.log(chalk.red.inverse.blue(requiredTitle.title));
        console.log(requiredTitle.body);
    }
}
//module.exports will export above methods and can be called from other other files.
module.exports = {
    addNotes: addNotes,
    removeNote : removeNote,
    listNote : listNote,
    readNote : readNote
}



