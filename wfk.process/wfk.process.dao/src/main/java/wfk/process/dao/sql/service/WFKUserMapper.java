package wfk.process.dao.sql.service;

import wfk.process.dao.sql.entity.WFKUser;

public interface WFKUserMapper extends Mapper<WFKUser> {
	int deleteByPrimaryKey(Integer id);

	int insert(WFKUser record);

	int insertSelective(WFKUser record);

	WFKUser selectByPrimaryKey(Integer id);

	int updateByPrimaryKeySelective(WFKUser record);

	int updateByPrimaryKey(WFKUser record);
}