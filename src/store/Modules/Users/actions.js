export default {
    async login(context, user){
        const res = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })

        if (!res.ok) {
            if(res.status == 400){
                throw new Error('Username and Password are incorrect')
            }
            throw new Error('Something went wrong!')
        }

        const result = await res.json()
        localStorage.setItem('token', result.token)
    }
}