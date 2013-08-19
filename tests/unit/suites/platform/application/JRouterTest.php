<?php
/**
 * @package     Joomla.UnitTest
 * @subpackage  Application
 *
 * @copyright   Copyright (C) 2005 - 2013 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE
 */

require_once JPATH_PLATFORM . '/joomla/application/router.php';

/**
 * Test class for JRouter.
 * Generated by PHPUnit on 2009-10-08 at 12:50:42.
 *
 * @package  Joomla.UnitTest
 *
 * @since    11.1
 */
class JRouterTest extends PHPUnit_Framework_TestCase
{
	/**
	 * Sets up the fixture, for example, opens a network connection.
	 * This method is called before a test is executed.
	 *
	 * @access protected
	 *
	 * @return void
	 */
	protected function setUp()
	{
		parent::setUp();

		$this->object = new JRouter;
	}

	/**
	 * Test...
	 *
	 * @todo Implement testGetInstance().
	 *
	 * @return void
	 */
	public function testGetInstance()
	{
		// Remove the following lines when you implement this test.
		$this->markTestIncomplete('This test has not been implemented yet.');
	}

	/**
	 * Test...
	 *
	 * @todo Implement testParse().
	 *
	 * @return void
	 */
	public function testParse()
	{
		// Remove the following lines when you implement this test.
		$this->markTestIncomplete('This test has not been implemented yet.');
	}

	/**
	 * Test...
	 *
	 * @todo Implement testBuild().
	 *
	 * @return void
	 */
	public function testBuild()
	{
		// Remove the following lines when you implement this test.
		$this->markTestIncomplete('This test has not been implemented yet.');
	}

	/**
	 * Test...
	 *
	 * @todo Implement testGetMode().
	 *
	 * @return void
	 */
	public function testGetMode()
	{
		// Remove the following lines when you implement this test.
		$this->markTestIncomplete('This test has not been implemented yet.');
	}

	/**
	 * Test...
	 *
	 * @todo Implement testSetMode().
	 *
	 * @return void
	 */
	public function testSetMode()
	{
		// Remove the following lines when you implement this test.
		$this->markTestIncomplete('This test has not been implemented yet.');
	}

	/**
	 * Cases for testSetVar
	 *
	 * @return array
	 */
	public function casesSetVar()
	{
		$cases = array();
		$cases[] = array(array(), 'myvar', 'myvalue', true, 'myvalue');
		$cases[] = array(array(), 'myvar', 'myvalue', false, null);
		$cases[] = array(array('myvar' => 'myvalue1'), 'myvar', 'myvalue2', true, 'myvalue2');
		$cases[] = array(array('myvar' => 'myvalue1'), 'myvar', 'myvalue2', false, 'myvalue2');

		return $cases;
	}

	/**
	 * testAttributes()
	 *
	 * @param   array    $vars      @todo
	 * @param   string   $var       @todo
	 * @param   mixed    $value     @todo
	 * @param   boolean  $create    @todo
	 * @param   string   $expected  @todo
	 *
	 * @dataProvider casesSetVar
	 *
	 * @return void
	 */
	public function testSetVar($vars, $var, $value, $create, $expected)
	{
		$this->object->setVars($vars, false);
		$this->object->setVar($var, $value, $create);
		$this->assertEquals($this->object->getVar($var), $expected, __METHOD__ . ':' . __LINE__ . ': value is not expected');
	}

	/**
	 * Test...
	 *
	 * @todo Implement testSetVars().
	 *
	 * @return void
	 */
	public function testSetVars()
	{
		// Remove the following lines when you implement this test.
		$this->markTestIncomplete('This test has not been implemented yet.');
	}

	/**
	 * Test...
	 *
	 * @todo Implement testGetVar().
	 *
	 * @return void
	 */
	public function testGetVar()
	{
		// Remove the following lines when you implement this test.
		$this->markTestIncomplete('This test has not been implemented yet.');
	}

	/**
	 * Test...
	 *
	 * @todo Implement testGetVars().
	 *
	 * @return void
	 */
	public function testGetVars()
	{
		// Remove the following lines when you implement this test.
		$this->markTestIncomplete('This test has not been implemented yet.');
	}

	/**
	 * Test...
	 *
	 * @todo Implement testAttachBuildRule().
	 *
	 * @return void
	 */
	public function testAttachBuildRule()
	{
		// Remove the following lines when you implement this test.
		$this->markTestIncomplete('This test has not been implemented yet.');
	}

	/**
	 * Test...
	 *
	 * @todo Implement testAttachParseRule().
	 *
	 * @return void
	 */
	public function testAttachParseRule()
	{
		// Remove the following lines when you implement this test.
		$this->markTestIncomplete('This test has not been implemented yet.');
	}

	/**
	 * Test...
	 *
	 * @todo Implement test_parseRawRoute().
	 *
	 * @return void
	 */
	public function test_parseRawRoute()
	{
		// Remove the following lines when you implement this test.
		$this->markTestIncomplete('This test has not been implemented yet.');
	}

	/**
	 * Test...
	 *
	 * @todo Implement test_parseSefRoute().
	 *
	 * @return void
	 */
	public function test_parseSefRoute()
	{
		// Remove the following lines when you implement this test.
		$this->markTestIncomplete('This test has not been implemented yet.');
	}

	/**
	 * Test...
	 *
	 * @todo Implement test_buildRawRoute().
	 *
	 * @return void
	 */
	public function test_buildRawRoute()
	{
		// Remove the following lines when you implement this test.
		$this->markTestIncomplete('This test has not been implemented yet.');
	}

	/**
	 * Test...
	 *
	 * @todo Implement test_buildSefRoute().
	 *
	 * @return void
	 */
	public function test_buildSefRoute()
	{
		// Remove the following lines when you implement this test.
		$this->markTestIncomplete('This test has not been implemented yet.');
	}

	/**
	 * Cases for test_processParseRules
	 *
	 * @return array
	 */
	public function cases_processParseRules()
	{
		$cases = array();
		$cases[] = array(array(), array());
		$cases[] = array(
			array(
				function (&$router, &$uri)
				{
					return array('myvar' => 'myvalue');
				}
			),
			array('myvar' => 'myvalue')
		);
		$cases[] = array(
			array(
				function (&$router, &$uri)
				{
					return array('myvar1' => 'myvalue1');
				},
				function (&$router, &$uri)
				{
					return array('myvar2' => 'myvalue2');
				},
			),
			array('myvar1' => 'myvalue1', 'myvar2' => 'myvalue2')
		);
		$cases[] = array(
			array(
				function (&$router, &$uri)
				{
					return array('myvar1' => 'myvalue1');
				},
				function (&$router, &$uri)
				{
					return array('myvar2' => 'myvalue2');
				},
				function (&$router, &$uri)
				{
					return array('myvar1' => 'myvalue3');
				},
			),
			array('myvar1' => 'myvalue1', 'myvar2' => 'myvalue2')
		);

		return $cases;
	}

	/**
	 * test_processParseRules().
	 *
	 * @param   array   $functions  @todo
	 * @param   string  $expected   @todo
	 *
	 * @dataProvider cases_processParseRules
	 *
	 * @return void
	 */
	public function test_processParseRules($functions, $expected)
	{
		$myuri = 'http://localhost';
		$stub = $this->getMock('JRouter', array('_parseRawRoute'));
		$stub->expects($this->any())->method('_parseRawRoute')->will($this->returnValue(array()));

		foreach ($functions as $function)
		{
			$stub->attachParseRule($function);
		}
		$this->assertEquals($stub->parse($myuri), $expected, __METHOD__ . ':' . __LINE__ . ': value is not expected');
	}

	/**
	 * Test...
	 *
	 * @todo Implement test_processBuildRules().
	 *
	 * @return void
	 */
	public function test_processBuildRules()
	{
		// Remove the following lines when you implement this test.
		$this->markTestIncomplete('This test has not been implemented yet.');
	}

	/**
	 * Test...
	 *
	 * @todo Implement test_createURI().
	 *
	 * @return void
	 */
	public function test_createURI()
	{
		// Remove the following lines when you implement this test.
		$this->markTestIncomplete('This test has not been implemented yet.');
	}

	/**
	 * Test...
	 *
	 * @todo Implement test_encodeSegments().
	 *
	 * @return void
	 */
	public function test_encodeSegments()
	{
		// Remove the following lines when you implement this test.
		$this->markTestIncomplete('This test has not been implemented yet.');
	}

	/**
	 * Test...
	 *
	 * @todo Implement test_decodeSegments().
	 *
	 * @return void
	 */
	public function test_decodeSegments()
	{
		// Remove the following lines when you implement this test.
		$this->markTestIncomplete('This test has not been implemented yet.');
	}
}
