package wfk.process.dao.sql.service;

import wfk.process.dao.sql.entity.TUser;

public interface TUserMapper extends Mapper<TUser> {
    int deleteByPrimaryKey(Integer id);

    int insert(TUser record);

    int insertSelective(TUser record);

    TUser selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(TUser record);

    int updateByPrimaryKey(TUser record);
}