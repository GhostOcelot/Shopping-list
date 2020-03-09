//shopping list

class App extends React.Component {
	state = {
		products: [
			{
				name: "chleb",
				id: 1,
				availableProducts: 10,
				productsInBasket: 0,
				price: 3
			},
			{
				name: "mleko",
				id: 2,
				availableProducts: 10,
				productsInBasket: 0,
				price: 4
			},
			{
				name: "masło",
				id: 3,
				availableProducts: 10,
				productsInBasket: 0,
				price: 7
			},
			{
				name: "piwo",
				id: 4,
				availableProducts: 10,
				productsInBasket: 0,
				price: 2
			},
			{
				name: "ciastka",
				id: 5,
				availableProducts: 10,
				productsInBasket: 0,
				price: 5
			},
			{name: "ser", id: 6, availableProducts: 10, productsInBasket: 0, price: 6}
		],
		yourMoney: 100,
		totalPrice: 0,
		tooExpensive: false
	}

	handleClick = (id, type) => {
		if (type === "add") {
			let newState = Object.assign({}, this.state)
			newState.products[id - 1].productsInBasket =
				this.state.products[id - 1].productsInBasket + 1
			newState.totalPrice =
				this.state.totalPrice + this.state.products[id - 1].price
			newState.tooExpensive = false

			this.setState(newState)
		} else if (type === "substract") {
			let newState = Object.assign({}, this.state)
			newState.products[id - 1].productsInBasket =
				this.state.products[id - 1].productsInBasket - 1
			;(newState.totalPrice =
				this.state.totalPrice - this.state.products[id - 1].price),
				(newState.tooExpensive = false)

			this.setState(newState)
		}
	}

	pay = () => {
		if (this.state.yourMoney >= this.state.totalPrice) {
			this.setState(prevState => ({
				yourMoney: prevState.yourMoney - prevState.totalPrice,
				totalPrice: 0,
				tooExpensive: false,
				products: prevState.products.map(item =>
					Object.assign(item, {productsInBasket: 0})
				)
			}))
		} else {
			this.setState({
				tooExpensive: true
			})
		}
	}

	reset = () => {
		this.setState(prevState => ({
			totalPrice: 0,
			tooExpensive: false,
			products: prevState.products.map(item =>
				Object.assign(item, {productsInBasket: 0})
			)
		}))
	}

	render() {
		return (
			<div id="main">
				<div id="header">
					<span className="navItem">Stan konta: {this.state.yourMoney} zł</span>
					<span className="navItem">
						Do zapłaty: {this.state.totalPrice} zł
					</span>
				</div>
				<div>
					<h2>Dostepne produkty</h2>
					<ul>
						<ProductList
							handleClick={this.handleClick}
							products={this.state.products}
						/>
					</ul>
					{this.state.totalPrice ? (
						<div id="controls">
							<button
								id="payButton"
								className="functionButton"
								onClick={this.pay}
							>
								Zapłać
							</button>
							<button
								id="emptyBasketButton"
								className="functionButton"
								onClick={this.reset}
							>
								Opróżnij koszyk
							</button>
						</div>
					) : null}

					{this.state.tooExpensive ? (
						<h3 id="warningText">Nie stać cię, biedaku!</h3>
					) : null}
				</div>
			</div>
		)
	}
}

const ProductList = props => {
	return (
		<React.Fragment>
			{props.products.map(item => (
				<ProductItem
					handleClick={props.handleClick}
					key={item.id}
					item={item}
				/>
			))}
		</React.Fragment>
	)
}

const ProductItem = props => {
	return (
		<div>
			<li>{props.item.name}</li>
			<span>{props.item.price} zł</span>
			<button
				disabled={props.item.productsInBasket <= 0}
				onClick={() => props.handleClick(props.item.id, "substract")}
			>
				-
			</button>
			<div id="productNumber">
				<span>{props.item.productsInBasket}</span>
			</div>
			<button
				disabled={props.item.productsInBasket >= props.item.availableProducts}
				onClick={() => props.handleClick(props.item.id, "add")}
			>
				+
			</button>
			<span>{props.item.price * props.item.productsInBasket} zł</span>
		</div>
	)
}

ReactDOM.render(<App />, document.getElementById("root"))
