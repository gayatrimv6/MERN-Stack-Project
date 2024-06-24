// server.js 
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');

mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use(cors()); // Use the cors middleware

const bookSchema = new mongoose.Schema({
	title: String,
	author: String,
	genre: String,
	description: String,
	price: Number,
	image: String,
});

const Book = mongoose.model('Book', bookSchema);

// Function to seed initial data into the database
const seedDatabase = async () => {
	try {
		await Book.deleteMany(); // Clear existing data

		const books = [
			{ title: 'Bluelock', author: 'Muneyuki Kaneshiro, Yusuke Nomura', genre: 'Sports', description: 'A controversial project to create the best egoistic striker', price: 499, image: 'https://s1.zerochan.net/Blue.Lock.600.3914162.jpg' },
			{ title: 'Psycho-Pass', author: 'Gen Urobuchi', genre: 'Thriller', description: 'A Japanese cyberpunk psychological thriller', price: 650, image: 'https://s1.zerochan.net/PSYCHO-PASS.600.3122316.jpg' },
			{ title: 'Spy x Family', author: 'Tatsuya Endo', genre: 'Comedy', description: 'A spy who has to build a family to execute a mission', price: 599, image: 'https://s1.zerochan.net/Spy.%C3%97.Family.600.3622963.jpg' },
			{ title: 'Haikyu!!', author: 'Haruichi Furudate', genre: 'Sports', description: 'A junior high school student passionate about volleyball ', price: 220, image: 'https://s1.zerochan.net/Haikyuu%21%21.600.3007001.jpg' },
			{ title: 'Moriarty The Patriot', author: 'Hikaru Miyoshi, Arthur Conan Doyle', genre: 'Thriller', description: 'A battle of wits of two of the greatest minds', price: 999, image: 'https://s1.zerochan.net/William.James.Moriarty.600.3095058.jpg' },
			{ title: 'Great Pretender', author: 'Ryota Kosawa, Jingluo Liu', genre: 'Comedy', description: 'Trick you! Deceive you! Cheat all fortunes of you!', price: 599, image: 'https://s1.zerochan.net/Great.Pretender.600.3108533.jpg' },
		
		];
		
		await Book.insertMany(books);
		console.log('Database seeded successfully');
	} catch (error) {
		console.error('Error seeding database:', error);
	}
};

// Seed the database on server startup
seedDatabase();

// Define API endpoint for fetching all books
app.get('/api/books', async (req, res) => {
	try {
		// Fetch all books from the database
		const allBooks = await Book.find();

		// Send the entire books array as JSON response
		res.json(allBooks);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
