const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (total, blog) => total + blog.likes

    return blogs.length === 0
        ? 0
        : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const reducer = (topBlog, blog) => {
        if (topBlog.likes < blog.likes) {
            return {title: blog.title, likes: blog.likes, author: blog.author}
        } else return topBlog
    }
    return blogs.reduce(reducer, {title: '', likes: -1, author: ''})
}

const mostBlogs = (blogs) => {
    const reducer = (authorList, blogToCheck) => {
        const index = authorList.findIndex( blog => blog.author === blogToCheck.author )
        if (index === -1) return authorList.concat({ author: blogToCheck.author, blogs:1 })
        authorList[index].blogs++
        return authorList
    }
   const  authorWithMostBlogs = blogs.reduce(reducer, []).reduce((max,author) =>{
       if (author.blogs > max.blogs) return author
       return max
    } , {blogs : 0})
    return authorWithMostBlogs
}

const mostLikes = (blogs) => {
    const reducer = (authorList, blogToCheck) => {
        const index = authorList.findIndex( blog => blog.author === blogToCheck.author )
        if (index === -1) return authorList.concat({ author: blogToCheck.author, likes: blogToCheck.likes })
        authorList[index].likes += blogToCheck.likes
        return authorList
    }
    const  authorWithMostLikes = blogs.reduce(reducer, []).reduce((max,author) =>{
        if (author.likes > max.likes) return author
        return max
    } , {likes : 0})
    return authorWithMostLikes
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}