import './Interesting.scss';

export const Interesting = () => { 
  return (
    <div className='interesting-container'>
      <div className='container interesting'>
        <div className='interesting-context'>
          <h1>Interesting</h1>
          <p className='interesting-text'> Imagine a collection of articles about traditional food.
            Stories about recipes passed down through generations, regional flavors, seasonal dishes, and the cultural meaning behind everyday meals.
            This section could explore how food connects people to their history, celebrations, and sense of home — from simple comfort dishes to festive holiday tables. 
            Here, traditions, ingredients, and memories would come together to tell the story of food beyond just recipes.
            For now, this page is intentionally left as a placeholder — a quiet space reserved for future ideas, stories, and inspiration.
          </p>
          <div className='interesting-image-container'>
            <img  className='interesting-image' src='/Interesting.jpg' alt='Picture of empty table' />
          </div>

        </div>
      </div>
    </div>
  )
}