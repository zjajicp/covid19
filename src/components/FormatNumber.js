const FormatNumber = ({children}) => {
	return new Intl.NumberFormat(navigator.language, {style: 'decimal'}).format(children);
};

export default FormatNumber;
