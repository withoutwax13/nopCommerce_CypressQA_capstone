// EditBlogPost.js

import AddBlogPostPage from "./AddBlogPostPage";

class EditBlogPostPage extends AddBlogPostPage{

    // getters are inherited from AddBlogPostPage class

    // methods

    editTitle(_title_data, clearPrevState=true){
        return clearPrevState ? this.titleInput.clear().type(_title_data) : this.titleInput.type(_title_data)
    }
    editBody(_body_data, clearPrevState=true){
        return clearPrevState ? this.bodyInput.clear().type(_body_data) : this.bodyInput.type(_body_data)
    }

    editOverview(_overview_data, clearPrevState=true){
        return clearPrevState ? this.overviewInput.clear().type(_overview_data) : this.overviewInput.type(_overview_data)
    }

    editTag(_tag_data, clearPrevState=true){
        return clearPrevState ? ()=>{
            this.tagInput.clear()
            _tag_data.forEach(tag => {
                this.tagInput.type(`${tag}{enter}`)
            });
            return this
        } : ()=>{
            _tag_data.forEach(tag => {
                this.tagInput.type(`${tag}{enter}`)
            });
            return this
        }
    }
}

export default EditBlogPostPage