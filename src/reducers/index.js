import { combineReducers } from 'redux';
import auth from './auth';
import user from './user';
import likes from './likes';
import posts from './posts';
import flagged from './flagged';
import detail from './detail';
import comments from './comments';
import replies from './replies';
import timeline from './timeline';
import profile from './profile';
import galleries from './gallieries';
import stats from './stats';
import general from './general';

const reducers = () =>
  combineReducers({
    auth,
    user,
    likes,
    posts,
    flagged,
    detail,
    comments,
    replies,
    timeline,
    profile,
    galleries,
    stats,
    general,
  });

export default reducers;
