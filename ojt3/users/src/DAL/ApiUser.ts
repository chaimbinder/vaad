import { Sequelize, DataTypes, Model } from 'sequelize';
import UserModel from '../model/userModel';

export interface User {
    getUser: (id: string) => Promise<UserModel | undefined>;
    createUser: (user: Omit<UserModel, "id">) => Promise<UserModel>
    updateUser: (user: UserModel) => Promise<boolean>
}

export async function init(sequelize: Sequelize): Promise<User> {
    const UserSchema = sequelize.define<Model<UserModel, Omit<UserModel, "id">>>('User', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        profile_picture_id: {
            type: DataTypes.UUID,
            allowNull: true
        },
        name: DataTypes.STRING,
        country: DataTypes.STRING,
        city: DataTypes.STRING,
        street: DataTypes.STRING,
        zip_code: DataTypes.STRING,
    }, {
        timestamps: false,
    })
    
    await UserSchema.sync({
        force: true
    })

    return {
        getUser: async function(id) {
            const user = await UserSchema.findByPk(id) 
            return user?.toJSON()

        },
        createUser: async function(user) {
            const entry = await UserSchema.create(user)
            return entry.toJSON()
        },
        updateUser: async function(user) {
            const dbUser = await UserSchema.findByPk(user.id)
            if(!dbUser) {
                return false;
            }
            try {
                dbUser.update(user)
                await dbUser.save()
            } catch(e) {
                return false;
            }
            return true;
        }
    }
}



