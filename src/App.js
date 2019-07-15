import React from "react";
import Header from "./components/Header";
import Booklist from "./components/BookList";
import CartList from "./components/CartList";
import SearchTitle from "./components/SearchTitle";
class App extends React.Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      books: [],
      cart: [],
      searchBy: { value: "", titleOrAuth: "title" },
      total: 0
    };
  }
  changeSearch = (newSearch, titleOrAuth) => {
    console.log(titleOrAuth);
    this.setState({ searchBy: { value: newSearch, titleOrAuth: titleOrAuth } });
  };

  async componentDidMount() {
    const response = await fetch("http://localhost:8082/api/books");
    const books = await response.json();
    console.log(books);
    this.setState(updater => {
      //console.log(JSON.stringify(books)+' updaterbooks - ')
      let inCart = [];

      books.forEach(book => {
        console.log(book.title + " --- " + book.inCart);
        if (book.inCart == true) {
          inCart.push(book);
        }
      });
      console.log("completed====" + JSON.stringify(inCart));
      const total = this.getTotal();
      return { books: books, cart: inCart, total: total };
    });
  }
  // /stocks/id/favorite : post

  getTotal = () => {
    let total = 0;
    this.setState(updater => {
      updater.cart.forEach(cartBook => {
        total += cartBook.price;
      });

      return { total: total };
    });
  };

  addToCart = async id => {
    const res = await fetch(`http://localhost:8082/api/books/cart/add/${id}`, {
      method: "PATCH"
    });

    if (!res.ok) {
    } else {
      this.setState(updater => {
        let findBook = updater.books.find(book => {
          return id == book.id;
        });
        if (updater.cart.findIndex(el => el.id == id) == -1) {
          return {
            cart: [...updater.cart, findBook],
            total: updater.total + findBook.price
          };
        } else {
          //already added
        }
      });
    }
  };
  //
  //   //
  //   removeFromFavorites = async id => {
  //     const res = await fetch(`http://localhost:3001/stocks/${id}/favorite`, {
  //       method: "DELETE"
  //     });
  //
  //     if (res.ok) {
  //       console.log("response it s ok with id " + id);
  //       this.setState(updater => {
  //         let newfavorites = updater.favorites.filter(el => {
  //           return el.id != id;
  //         });
  //         return { favorites: newfavorites };
  //       });
  //     } else {
  //       //Error state
  //     }
  //   };

  // challenge 1: fetch stocks from api and render StocksList component
  // challenge 2: add favorites section and give the user the ability to favorite stocks and persist to the backend.
  // challenge 3: add remove from favorites button to each favorite and persist to backend
  // challenge 4: add the ability to search by stock name
  // challenge 5: add a "search by" component that allows the user to choose to search by stock name OR stock price
  // challenge 6: add a "sort by" component that allows the user to choose to sort all stocks by stock name OR stock price

  render() {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2
    });

    let filteredSearch;

    if (this.state.searchBy.titleOrAuth == "title") {
      filteredSearch = this.state.books.filter(book => {
        return book.title
          .toUpperCase()
          .includes(this.state.searchBy.value.toUpperCase());
      });
    }

    if (this.state.searchBy.titleOrAuth == "author") {
      filteredSearch = this.state.books.filter(book => {
        return book.author
          .toUpperCase()
          .includes(this.state.searchBy.value.toUpperCase());
      });
    }

    return (
      <>
        <Header />
        <div className="container">
          <div className="row">
            <Booklist
              books={filteredSearch}
              addToCart={this.addToCart}
              changeSearch={this.changeSearch}
            />
            <CartList
              cart={this.state.cart}
              total={formatter.format(this.state.total)}
              // removeFromFavorites={this.removeFromFavorites}
            />
          </div>
        </div>
      </>
    );
  }
}

export default App;
