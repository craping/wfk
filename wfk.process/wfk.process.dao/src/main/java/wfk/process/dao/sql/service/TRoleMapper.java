package wfk.process.dao.sql.service;

import wfk.process.dao.sql.entity.TRole;

public interface TRoleMapper extends Mapper<TRole> {
    int deleteByPrimaryKey(Integer id);

    int insert(TRole record);

    int insertSelective(TRole record);

    TRole selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(TRole record);

    int updateByPrimaryKey(TRole record);
}