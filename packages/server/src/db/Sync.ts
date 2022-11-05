import { truncate } from "fs";
import db from ".";
import { Stats } from "./models/Stats";
// import { Stats } from "./models/Stats";

import { User } from "./models/User"

console.log('Sync');

export const SyncDB = async () => {
    console.log('Sync started!');
    await db.sync();

    const userCount = await User.count();

    if (userCount > 0) {
        User.destroy({where: {}, truncate: true});

        Stats.destroy({where: {}, truncate: true});
    }

    
    const user = new User();
    user.username = 'alex'
    user.password = 'password'
    user.email = 'alex@domain.com';
    user.save();
    
    const stats = new Stats();
    stats.userId = user.id;
    stats.save();

    
    // user.stats = new Stats();
    console.log('Sync ended');
};