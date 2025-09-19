const person = { myname: 'David', age: 25, city: 'London' };
    const { myname, ...otherDetails } = person;
    console.log(myname);
    console.log(otherDetails); 

