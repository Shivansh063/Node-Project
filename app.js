
//chalk, yargs are required in-built Node module
const chalk = require('chalk');
const yargs = require('yargs');
//Importing another javascript file to perform function for Validations 
const file = require('./notes.js');

//Created object with some properties like command, builder, handler for Add command
yargs.command({
    command:"Add",
    describe: "Add a note",
    //builder is used to define properties for title and body like demandOption, 
    //type and describe
    builder:{
        title : {
            describe: "Add Title",
            demandOption : true,
            type: 'string'
        },
        body : {
            describe: "Add Body",
            demandOption : true,
            type: 'string'
        }
    },
    //handler is used to call function addNotes() with two arguments title and body
    // when Add command is given through console. 
    handler (argv) {
        file.addNotes(argv.title,argv.body);
    }
})

//Created object with some properties like command, builder, handler for Remove command
yargs.command({
    command:"Remove",
    describe: "Remove a Note",
    //builder is used to define properties for title like demandOption, type and describe
    builder :{
        title:{
            describe: 'Remove note',
            demandOption: true,
            type:'string'
        }
    },
    //handler is a function which will call removeNote() with single argument title.
    handler (argv){
        file.removeNote(argv.title);
    }
})

//Created Object with some properties like command, builder, handler for Read command
yargs.command({
    command: "Read",
    describe: "Read Note",
    //builder is used to define properties for title like demandOption, type and describe
    decribe :{
        title:{
            describe : "Title Required",
            demandOption: true,
            type:'string'
        }
    },
    //handler is a function which will call readNote() with single argument title
    handler(argv){
        file.readNote(argv.title);
    }
})

//Created Object with some properties like command, builder, handler for List command
yargs.command({
    command: "List",
    describe: "Listing Notes",
    //handler is a function which will call listNote() to list out Notes
    handler (){
        file.listNote();
    }
})

yargs.parse();

