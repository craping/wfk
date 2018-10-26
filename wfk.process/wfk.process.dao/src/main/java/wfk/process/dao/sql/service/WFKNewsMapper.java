package wfk.process.dao.sql.service;

import wfk.process.dao.sql.entity.WFKNews;

public interface WFKNewsMapper extends Mapper<WFKNews> {
	int deleteByPrimaryKey(Integer id);

	int insert(WFKNews record);

	int insertSelective(WFKNews record);

	WFKNews selectByPrimaryKey(Integer id);

	int updateByPrimaryKeySelective(WFKNews record);

	int updateByPrimaryKey(WFKNews record);
}