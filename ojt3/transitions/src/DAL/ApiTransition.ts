import { Sequelize, DataTypes, Model } from 'sequelize';
import TransitionsModel from '../model/transitionModel';

export interface Transitions {
    getTransitions: (id: string) => Promise<TransitionsModel | undefined>;
    createTransitions: (transition: Omit<TransitionsModel, "id">) => Promise<TransitionsModel>
    updateTransitions: (transition: TransitionsModel) => Promise<boolean>
}

export async function init(sequelize: Sequelize): Promise<Transitions> {
    const TransitionSchema = sequelize.define<Model<TransitionsModel, Omit<TransitionsModel, "id">>>('Transition', {
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
    
    await TransitionSchema.sync({
        force: true
    })

    return {
        getTransitions: async function(id) {
            const user = await TransitionSchema.findByPk(id) 
            return user?.toJSON()

        },
        createTransitions: async function(transition) {
            const entry = await TransitionSchema.create(transition)
            return entry.toJSON()
        },
        updateTransitions: async function(transition) {
            const dbUser = await TransitionSchema.findByPk(transition.id)
            if(!dbUser) {
                return false;
            }
            try {
                dbUser.update(transition)
                await dbUser.save()
            } catch(e) {
                return false;
            }
            return true;
        }
    }
}



