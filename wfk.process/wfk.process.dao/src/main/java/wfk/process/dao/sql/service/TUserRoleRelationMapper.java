package wfk.process.dao.sql.service;

import wfk.process.dao.sql.entity.TUserRoleRelation;

public interface TUserRoleRelationMapper extends Mapper<TUserRoleRelation> {
    int deleteByPrimaryKey(Integer id);

    int insert(TUserRoleRelation record);

    int insertSelective(TUserRoleRelation record);

    TUserRoleRelation selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(TUserRoleRelation record);

    int updateByPrimaryKey(TUserRoleRelation record);
}