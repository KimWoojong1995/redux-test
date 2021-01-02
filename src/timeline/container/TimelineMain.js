import React, { useReducer, useEffect } from 'react';
import store from '../../common/store';
import { getNextTimeline } from '../../common/mockData';
import { addTimeline } from '../state';
import TimelineList from '../component/TimelineList';

function TimelineMain() {
    const [, forceUpdate] = useReducer(v => v + 1, 0);
    useEffect(() => {
        let prevTimelines = store.getState().timeline.timelines;
        const unsubscribe = store.subscribe(() => {
            const timelines = store.getState().timeline.timelines;
            if (prevTimelines !== timelines) {
                forceUpdate();
            }
            prevTimelines = timelines;
        });
        return () => unsubscribe();
    }, []);

    function onAdd() {
        const timeline = getNextTimeline();
        store.dispatch(addTimeline(timeline));
    }
    console.log("timelineMain render");
    const timelines = store.getState().timeline.timelines;
    return (
       <div>
           <button onClick={onAdd}>타임라인 추가</button>
           <TimelineList timelines={timelines} />
       </div>
    );
};

export default TimelineMain;