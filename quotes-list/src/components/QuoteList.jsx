import QuoteCard from "./QuoteCard";

function QuoteList({ quotes }) {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
			{quotes.map((quote) => (
				<QuoteCard
					key={quote.id}
					quote={quote}
				/>
			))}
		</div>
	);
}

export default QuoteList;
