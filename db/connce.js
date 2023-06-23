const mongooes = require('mongoose');

mongooes.set('strictQuery', false);

mongooes.connect("mongodb+srv://khenisneha2004:sneha12345@123cluster0.endkze8.mongodb.net/table-data?retryWrites=true&w=majority", {
    useNewUrlParser: true,
}).then(() => {
    console.log('DB connect Done');
}).catch((error) => {
    console.log(error);
});