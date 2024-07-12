import { DataTypes } from 'npm:sequelize';
export default (sequelize)=>{
    sequelize.define('Genre', {
        id: {
            type:DataTypes.INTEGER,
            primaryKey: true,
            // defaultVariable
        },
        name:{
            type:DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    })
    
}