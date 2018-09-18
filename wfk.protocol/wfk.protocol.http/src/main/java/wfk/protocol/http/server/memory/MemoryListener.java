package wfk.protocol.http.server.memory;

import javax.annotation.PostConstruct;

import org.springframework.stereotype.Component;

import wfk.common.define.Configuration;

@Component
public class MemoryListener {
	
	@PostConstruct
	public void init() {
		Configuration.init();
	}
}
