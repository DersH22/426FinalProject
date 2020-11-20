const data = require('data-store')( {path: process.cwd() + '/data/Secret.json'})


class Secret {

    constructor(id, owner, secret) {
        this.id = id
        this.owner = owner
        this.secret = secret
    }

    update (secret) {
        this.secret = secret
        data.set(this.id.toString(), this)
    }

    delete() {
        data.del(this.id.toString())
    }

}

Secret.getAllIDs = () => {
    return Object.keys(data.data).map((id => {return parseInt(id)}))
}

Secret.getAllIDsForOwner = (owner) => {
    return Object.keys(data.data).filter(id => data.get(id).owner == owner).map((id => {return parseInt(id)}))
}

Secret.getSecretByID = (id) => {
    let SecretData = data.get(id)
    if (SecretData == null) {
        return null
    }
    return new Secret(SecretData.id, SecretData.owner, SecretData.secret)
}

Secret.next_id = Secret.getAllIDs().reduce((max, next_id) => {
    if (max < next_id) {
        return next_id
    }
    return max
}, - 1) + 1

Secret.create = (owner, secret) => {
    let id = Secret.next_id
    Secret.next_id += 1
    let b = new Secret (id, owner, secret)
    data.set(b.id.toString(), b)
    return b
}





module.exports = Secret;