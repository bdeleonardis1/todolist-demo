import { withRouter } from "react-router";
import React from 'react';

function UpArrow(props) {
    return <button className="arrow" onClick={props.action}>Up&uarr;</button>
}

function DownArrow(props) {
    return <button className="arrow" onClick={props.action}>Down&darr;</button>
}

function CompBox(props) {
    return <input type="checkbox" onClick={props.action} />
}

function Item(props) {
    return (
        <li>{props.text}
            <UpArrow action={() => props.onUp(props.index)} />
            <DownArrow action={() => props.onDown(props.index)} />
            <CompBox action={() => props.onCheck(props.index)} />
        </li>
    )
}

class TodoApp extends React.Component {
    constructor(props) {
        console.log("Constructor props:", props);
        super(props);
        this.state = { items: [] };

        this.addItem = this.addItem.bind(this);
        this.upAction = this.upAction.bind(this);
        this.downAction = this.downAction.bind(this);
        this.checkAction = this.checkAction.bind(this);
        this.save = this.save.bind(this);
        this.noAuth = false;
    }

    render() {
        return (
            <div>
                <List items={this.state.items}
                    upAction={this.upAction}
                    downAction={this.downAction}
                    checkAction={this.checkAction} />
                <AddItem onClick={this.addItem} />
                <SaveChanges save={this.save} />
            </div>
        )
    }

    save() {
        var userid = 2;
        fetch('/list/save/' + userid, {
            method: 'POST',
            redirect: 'follow',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "items": this.state.items })
        })
        .then((response) => {
            console.log("In first then");
            return response.json();
        })
        .then((response) => {
            console.log("In SAVE then");
            if (response.success) {
                console.log("Successfully saved")
            } else {
                if (response.noAuth) {
                    this.props.history.push("/login");
                }
            }
        });
    }



    addItem() {
        this.setState((prevState) => {
            var addItemBox = document.getElementById("addItemBox");
            var text = addItemBox.value;

            if (text.length == 0) {
                return;
            }

            var items = this.state.items.slice(0, this.state.items.length);
            items.push(text);
            addItemBox.value = "";
            return { items: items };
        });
    }

    upAction(index) {
        if (index != 0 && this.state.items.length > 1) {
            var items = this.state.items.slice();
            var temp = items[index];
            items[index] = items[index - 1];
            items[index - 1] = temp;

            this.setState({ items: items });
        }
    }

    downAction(index) {
        if (index != this.state.items.length - 1 && this.state.items.length > 1) {
            var items = this.state.items.slice();
            var temp = items[index];
            items[index] = items[index + 1];
            items[index + 1] = temp;

            this.setState({ items: items });
        }
    }

    checkAction(index) {
        var items = this.state.items.slice();
        items.splice(index, 1);

        this.setState({ items: items });
    }

    componentDidMount() {
        console.log("DidMountProps:", this.props)
        var userid = 2;
        fetch("/list/items/" + userid, { redirect: 'follow' })
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                if (response.noAuth) {
                    console.log("props:", this.props.history);
                    this.props.history.push('/login');
                    this.setState({ noAuth: true });
                } else {
                    this.setState({ items: response.items });
                }
            });
    }
}

function List(props) {
    var listItems = [];
    for (var i = 0; i < props.items.length; i++) {
        listItems.push(<Item text={props.items[i]} key={i} index={i} onUp={props.upAction}
            onDown={props.downAction} onCheck={props.checkAction} />);
    }

    return (
        <ol>
            {listItems}
        </ol>
    );
}

class AddItem extends React.Component {
    constructor(props) {
        super(props);

        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    render() {
        return (
            <div>
                <input id="addItemBox" type="text" onKeyPress={this.handleKeyPress} />
                <button onClick={this.props.onClick}>Add</button>
            </div>
        );
    }

    handleKeyPress(event) {
        if (event.key == 'Enter') {
            this.props.onClick();
        }
    }
}

function SaveChanges(props) {
    return (
        <div className="save">
            <button onClick={props.save}>Save Changes</button>
        </div>
    )
}

export default withRouter(TodoApp);