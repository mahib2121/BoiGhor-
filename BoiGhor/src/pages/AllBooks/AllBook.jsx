import React, { useEffect, useState } from 'react';
import BookCard from '../../components/BookCard';

const AllBook = () => {
    const [books, setBook] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/books")
            .then(res => res.json())
            .then(data => setBook(data));
    }, []);
    return (
        <div>
            <div className='py-10'>
                <h2 className='text-center text-3xl font-semibold mb-6 '>All Books</h2>

                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                    {
                        books.map(book => (
                            <BookCard key={book.id} book={book} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default AllBook;