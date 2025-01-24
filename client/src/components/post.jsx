function post() {
  return (
    <div className='post'>
        <div className="image">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6vJkbAWVHg_H9haoeG7xjnne2yUKEJBDOcQ&s" alt="" />
        </div>
        <div className="texts">
        <h2>
            Mastering the Art of Writing a Blog Post: A Step-by-Step Guide for 2024
        </h2>
        <p className="info">
            <span className="author">John Doe</span>
            <time>September 14, 2024</time>
        </p>
        <p className='summary'>Starting a blog was one of the most rewarding things I’ve done in my career. As someone who loves writing and connecting with readers, having an outlet to share my thoughts while potentially helping others has been an incredible experience.</p>
        </div>
    </div>
  );
}

export default post;