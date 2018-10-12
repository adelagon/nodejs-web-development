import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import './App.css';

class Books extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            book: null,
            books: [],
            publishers: [],
            authors: [],
            selected: null,
            isLoading: true,
            showEditDialog: false,
        };

        this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
        this.handleSelectFieldChange = this.handleSelectFieldChange.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
        this.onAddBook = this.onAddBook.bind(this);
        this.onSaveBook = this.onSaveBook.bind(this);
        this.onAddClick = this.onAddClick.bind(this);
        this.onDeleteBook = this.onDeleteBook.bind(this);
        this.onEditDialogClose = this.onEditDialogClose.bind(this);
        this.onAddDialogClose = this.onAddDialogClose.bind(this);
        this.onDeleteDialogClose = this.onDeleteDialogClose.bind(this);
    }

    async componentDidMount() {
        this.setState({ isloading: true });

        const response1 = await fetch('http://localhost:5000/api/v1/books');
        const response2 = await fetch('http://localhost:5000/api/v1/publishers');
        const response3 = await fetch('http://localhost:5000/api/v1/authors');

        const books = await response1.json();
        const publishers = await response2.json();
        const authors = await response3.json();

        this.setState({
            books: books, 
            publishers: publishers,
            authors: authors,
            isLoading: false
        });
    }

    onDeleteClick(book, index) {
        this.setState({
            book: book,
            showDeleteDialog: true,
            selected: index
        });
    }

    onAddClick() {
        this.setState({
            showAddDialog: true
        });
    }

    onEditClick(book, index) {
        console.log(book.authorId);
        this.setState({ 
            book: book,
            showEditDialog: true,
            formTitle: book.title,
            formCopyright: book.copyright,
            formAuthor: book.authorId,
            formPublisher: book.publisherId,
            selected: index
        });
    }

    onAddDialogClose() {
        this.setState({ showAddDialog: false });
    }

    onEditDialogClose() {
        this.setState({ showEditDialog: false });
    }

    onDeleteDialogClose() {
        this.setState({ showDeleteDialog: false});
    }

    handleTextFieldChange(e) {
        this.setState({ [e.target.id]: e.target.value });
    }

    handleSelectFieldChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
            [e.target.value]: e.target.value,
        });
    }

    async onSaveBook() {
        var body = {
                "title": this.state.formTitle,
                "copyright": this.state.formCopyright,
                "authorId": this.state.formAuthor,
                "publisherId": this.state.formPublisher
            }
        const response = await fetch('http://127.0.0.1:5000/api/v1/books/' + this.state.book.bookId, {
            method: "PUT",
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(body)
        });
        var book = await response.json();
        this.state.books[this.state.selected] = book;
        this.setState({ showEditDialog: false });
    }

    async onAddBook() {
        var body = {
            "title": this.state.formTitle,
            "copyright": this.state.formCopyright,
            "authorId": this.state.formAuthor,
            "publisherId": this.state.formPublisher
        }
        console.log(body);
        const response = await fetch('http://127.0.0.1:5000/api/v1/books/', {
            method: "POST",
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(body)
        });
        var book = await response.json();
        this.state.books.push(book);
        this.setState({ showAddDialog: false });
    }

    async onDeleteBook() {
        await fetch('http://127.0.0.1:5000/api/v1/books/' + this.state.book.bookId, {
            method: "DELETE"
        });
        this.state.books.pop(this.state.selected);
        this.setState({ showDeleteDialog: false });
    }

    render() {
        // Progress Icon
        const {
            book,
            books,
            publishers,
            authors,
            isLoading,
            showEditDialog,
            showAddDialog,
            showDeleteDialog,
            formTitle,
            formCopyright
        } = this.state

        if (isLoading) {
            return (
                <div>
                    <CircularProgress />
                </div>
            );
        }

        if (showDeleteDialog) {
            return (
            <div>
                <Dialog
                    open={showDeleteDialog}
                    onClose={this.onDeleteDialogClose}
                    overlayStyle={{backgroundColor: 'transparent'}}
                >
                    <DialogTitle>Delete Confirmation</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to Delete <b>{ book.title }</b>?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.onDeleteBook} color="primary" autoFocus>
                            Delete
                        </Button>
                        <Button onClick={this.onDeleteDialogClose}>
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            )
        }

        if (showEditDialog) {
            return (
            <div>
                <Dialog
                    open={this.state.showEditDialog}
                    onClose={this.onEditDialogClose}
                    fullWidth={ true }
                >
                    <DialogTitle>Edit Book</DialogTitle>
                    <DialogContent>

                        <form>
                            <FormControl style={{ display: 'flex' }} margin={ "normal" }>
                                <TextField id="formTitle" label="Title" defaultValue={ book.title } value={ formTitle } onChange={ this.handleTextFieldChange }/>
                            </FormControl>
                            <FormControl style={{ display: 'flex' }} margin={ "normal" }>
                                <TextField id="formCopyright" label="Copyright" defaultValue={ book.copyright } value={ formCopyright } onChange={ this.handleTextFieldChange }/>
                            </FormControl>
                            <FormControl style={{ display: 'flex' }} margin={ "normal" }>
                                <InputLabel>Author</InputLabel>
                                <Select name="formAuthor" value={ this.state.formAuthor } onChange={ this.handleSelectFieldChange }>
                                { authors.map( author => 
                                    <MenuItem id="authorField" value={author.authorId}>{author.lastName}, {author.firstName}</MenuItem>
                                )}
                                </Select>
                            </FormControl>
                            <FormControl style={{ display: 'flex' }} margin={ "normal" }>
                                <InputLabel>Publisher</InputLabel>
                                <Select name="formPublisher" value={ this.state.formPublisher } onChange={ this.handleSelectFieldChange }>
                                <InputLabel>Publisher</InputLabel>
                                { publishers.map( publisher =>
                                    <MenuItem value={publisher.publisherId}>{publisher.name}</MenuItem>
                                )}
                                </Select>
                            </FormControl>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.onSaveBook} color="primary" autoFocus>
                            Save
                        </Button>
                        <Button onClick={this.onEditDialogClose}>
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            )
        }

        if (showAddDialog) {
            return (
            <div>
                <Dialog
                    open={this.state.showAddDialog}
                    onClose={this.onAddDialogClose}
                    fullWidth={ true }
                >
                    <DialogTitle>Edit Book</DialogTitle>
                    <DialogContent>

                        <form>
                            <FormControl style={{ display: 'flex' }} margin={ "normal" }>
                                <TextField id="formTitle" label="Title" onChange={ this.handleTextFieldChange }/>
                            </FormControl>
                            <FormControl style={{ display: 'flex' }} margin={ "normal" }>
                                <TextField id="formCopyright" label="Copyright" onChange={ this.handleTextFieldChange }/>
                            </FormControl>
                            <FormControl style={{ display: 'flex' }} margin={ "normal" }>
                                <InputLabel>Author</InputLabel>
                                <Select name="formAuthor" value={ this.state.formAuthor } onChange={ this.handleSelectFieldChange }>
                                { authors.map( author => 
                                    <MenuItem id="authorField" value={author.authorId}>{author.lastName}, {author.firstName}</MenuItem>
                                )}
                                </Select>
                            </FormControl>
                            <FormControl style={{ display: 'flex' }} margin={ "normal" }>
                                <InputLabel>Publisher</InputLabel>
                                <Select name="formPublisher" value={ this.state.formPublisher }onChange={ this.handleSelectFieldChange }>
                                <InputLabel>Publisher</InputLabel>
                                { publishers.map( publisher =>
                                    <MenuItem value={publisher.publisherId}>{publisher.name}</MenuItem>
                                )}
                                </Select>
                            </FormControl>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.onAddBook} color="primary" autoFocus>
                            Save
                        </Button>
                        <Button onClick={this.onAddDialogClose}>
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            )
        }

        return (
            <div>
                <Button variant="fab" mini color="secondary" aria-label="Add" onClick={() => this.onAddClick()}>
                    <AddIcon />
                </Button>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><center><b>ID</b></center></TableCell>
                            <TableCell><center><b>Title</b></center></TableCell>
                            <TableCell><center><b>Copyright</b></center></TableCell>
                            <TableCell><center><b>Author</b></center></TableCell>
                            <TableCell><center><b>Publisher</b></center></TableCell>
                            <TableCell><center><b>Actions</b></center></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { books.map((book, index) => 
                            <TableRow>
                                <TableCell>{book.bookId}</TableCell>
                                <TableCell>{book.title}</TableCell>
                                <TableCell>{book.copyright}</TableCell>
                                <TableCell>{book.authorId}</TableCell>
                                <TableCell>{book.publisherId}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => this.onEditClick(book, index)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => this.onDeleteClick(book, 'delete')}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                            )
                        }

                    </TableBody>
                </Table>
            </div>
        );
    }
}

export default Books;