import React from "react";

class SearchTitle extends React.Component {
	constructor(props) {
		super(props);
		// Don't call this.setState() here!
		this.state = { value: "", radio: "title" };
		this.handleSearch = this.handleSearch.bind(this);
	}

	handleSearch = e => {
		let value = e.target.value;
				this.setState(updater =>
			{
				this.props.changeSearch(value,updater.radio);
				return { value: value }
			});
	};

	onRadioChange = e => {
		let radio = e.target.value;
		this.setState(updater =>
			{
				this.props.changeSearch(updater.value,radio);
				return { radio: radio }
			});

	};
	render() {
		return (
			<>
				<form>
					<div className="input-group">
						<div className="input-group-prepend">
							<div className="input-group-text">
								<label
									className="form-check-label mr-2"
									htmlFor="title"
								>
									Title
								</label>
								<input
									type="radio"
									value="title"
									checked={this.state.radio === "title"}
									onChange={this.onRadioChange}
								/>
							</div>
							<div className="input-group-text">
								<label
									className="form-check-label mr-2"
									htmlFor="author"
								>
									Author
								</label>
								<input
									type="radio"
									value="author"
									checked={this.state.radio === "author"}
									onChange={this.onRadioChange}
								/>
							</div>
						</div>
						<input
							type="text"
							value={this.state.value}
							onChange={this.handleSearch}
							placeholder="Search..."
						/>
					</div>
				</form>
			</>
		);
	}
}

export default SearchTitle;
