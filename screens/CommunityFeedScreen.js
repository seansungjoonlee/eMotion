let movement = context.movementData[context.getCurrentMovementIndex()];
    console.log(movement.dateEntry);
    for (let friendIndex = 0; friendIndex < friendsData.length; friendIndex++) {
        let notif = {};
        let shouldWe = randomNumber(0, 99);
        if (shouldWe < 80) {
            // let randFriend = randomNumber(0, friendsData.length - 1);
            let friend = friendsData[friendIndex];
            notif.friend = friend.name;
            let randMotion = randomNumber(0, movement.motionEntry.length - 1);
            let motion = movement.motionEntry[randMotion];
            if (!isNaN(parseInt(motion.name.slice(0,1)))) {
                console.log("was a time " + motion.name);
                continue;
            } else {
                console.log("not a time " + motion.name);
            }
            let motionOrEmotion = randomNumber(1, 2);
            if (motionOrEmotion == 1) {
                //it's a motion  
                let randAffirmation = randomNumber(0, affirmations.length - 1);
                let affirmation = affirmations[randAffirmation];
                notif.message = '...both logged ' + motion.name.slice(0, motion.name.length - 2) + ' today. ' + affirmation;
            } else {
                //it's a feeling
                let randFeeling = randomNumber(0, motion.feelings.length - 1);
                let feeling = motion.feelings[randFeeling];
                if (positives.includes(feeling)) {
                    notif.message = 'both felt ' + feeling + ' today. ' + positive;
                } else if (negatives.includes(feeling)) {
                    notif.message = 'both felt ' + feeling + ' today. ' + negative;
                } else {
                    notif.message = 'both felt ' + feeling + ' today.';
                }
            }   
        // console.log(notif.friend);
        // console.log(notif.message);   
        notifs.push(notif);
        }
    }  
