import bcrypt from 'bcrypt';

import { db } from ".";
import { Stats } from "./models/Stats";
import { User } from "./models/User"

console.log('Sync');

(async () => {
    console.log('Sync started!');
    // await db.sync();
    await db.sync({force: true});

    const userCount = await User.count();
    const statsCount = await Stats.count();

    if (userCount == 0 || statsCount === 0) {
        const users = await User.bulkCreate(Array.from(Array(5).keys()).map((id) => ({
            username: `User-${id + 1}`,
            password: bcrypt.hashSync(`Pass-${id + 1}`, 10),
            email: `email@domain${1}.com`
        })));
    
        const stats = await Stats.bulkCreate(users.map((user) => ({
            userId: user.id
        })));
    }

    console.log('Sync ended');
})();