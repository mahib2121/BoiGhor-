import React, { useEffect, useState } from 'react';
import BookCard from './BookCard';

const LateBook = () => {
    const [books, setBook] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/books")
            .then(res => res.json())
            .then(data => setBook(data));
    }, []);

    return (
        <div className='py-10'>
            <h2 className='text-3xl font-semibold mb-6'>Latest Books</h2>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {
                    books.slice(2, 6).map(book => (
                        <BookCard key={book.id} book={book} />
                    ))
                }
            </div>
        </div>
    );
};

export default LateBook;
