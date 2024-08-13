import { Link } from 'react-router-dom';

const List = ({ lists }) => {
  return (
    <main>
      {lists.map((list) => (
        <Link key={list._id} to={`/lists/${list._id}`}>
          <article>
            <header>
              <h2>{list.title}</h2>
              <p>
                {list.author.username} posted on {new Date(list.createdAt).toLocaleDateString()}
              </p>
            </header>
            <p>{list.description}</p>
          </article>
        </Link>
      ))}
    </main>
  );
};

export default List;
