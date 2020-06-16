export class Posts {
    id: string;
    title: string;
    content: string;
    post_image: string;
    hash_tag: string;
    likes: string;
    liked_by: [{
        first_name: string,
        last_name: string,
        email: string;
    }]
    isLiked: boolean;
    created_on: string;
    created_by: {
        id: '',
        profile_picture: '',
        first_name: '',
        last_name: ''
    }
}
