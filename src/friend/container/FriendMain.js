import React from 'react';
import { getNextFriend } from '../../common/mockData';
import { addFriend } from '../state';
import FriendList from '../component/FriendList';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import NumberSelect from '../component/NumberSelect';
import { MAX_AGE_LIMIT, MAX_SHOW_LiMIT } from '../common';
import { getFriendsWithAgeLimit, getFriendsWithAgeShowLimit } from '../state/selector';

export default function FriendMain() {
    const [ageLimit, showLimit, friendsWithAgeLimit, friendsWithAgeShowLimit] = useSelector(state => [
        getAgeLimit(state),
        getShowLimit(state),
        getFriendsWithAgeLimit(state),
        getFriendsWithAgeShowLimit(state,)
    ], shallowEqual);
    const dispatch = useDispatch();
    function onAdd() {
        const friend = getNextFriend();
        dispatch(actions.addFriend(friend));
    };

    // const [, forceUpdate] = useReducer(v => v + 1, 0);
    // useEffect(() => {
    //     let prevFriends = store.getState().friend.friends;
    //     const unsubscribe = store.subscribe(() => {
    //         const friends = store.getState().friend.friends;
    //         if (prevFriends !== friends) {
    //             forceUpdate();
    //         }
    //         prevFriends = friends;
    //     });
    //     return () => unsubscribe();
    // }, []);
    // function onAdd() {
    //     const friend = getNextFriend();
    //     store.dispatch(addFriend(friend));
    // };
    // const friends = store.getState().friend.friends;
    
    console.log("FriendMain render");
    return (
        <div>
            <button onClick={onAdd}>친구 추가</button>
            <NumberSelect
              onChange={v => dispatch(actions.setAgeLimit(v))}
              value={ageLimit}
              options={AGE_LIMIT_OPTIONS}
              postfix="세 이하만 보기"
            />
            <FriendList friends={friendsWithAgeLimit} />
            <NumberSelect
              onChange={v => dispatch(actions.setShowLimit(v))}
              value={showLimit}
              options={SHOW_LIMIT_OPTIONS}
              postfix="명 이하만 보기 (연령 제한 적용)"
            />
            <FriendList friends={friendsWithAgeShowLimit} />
        </div>
    );
};

const AGE_LIMIT_OPTIONS = [15, 20, 25, MAX_AGE_LIMIT];
const SHOW_LIMIT_OPTIONS = [2, 4, 6, MAX_SHOW_LiMIT];